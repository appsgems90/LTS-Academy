# AWS S3 & GitHub Actions Setup Guide

## 📋 Overview

This document explains how to set up AWS S3 buckets and configure GitHub Actions for automated deployments.

## 🪣 AWS S3 Setup

### 1. Create S3 Buckets

#### Test Bucket: `app-lts-test`
```bash
# Create bucket
aws s3 mb s3://app-lts-test --region us-east-1

# Enable static website hosting
aws s3 website s3://app-lts-test --index-document index.html --error-document index.html

# Make bucket public (for testing)
aws s3api put-bucket-policy --bucket app-lts-test --policy '{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::app-lts-test/*"
  }]
}'
```

#### Production Bucket: `app-lts-prod`
```bash
# Same steps as above, just replace bucket name
aws s3 mb s3://app-lts-prod --region us-east-1
aws s3 website s3://app-lts-prod --index-document index.html --error-document index.html
aws s3api put-bucket-policy --bucket app-lts-prod --policy '{...}'
```

### 2. Create IAM User for GitHub Actions

```bash
# Create user
aws iam create-user --user-name github-actions-lts

# Create access keys
aws iam create-access-key --user-name github-actions-lts

# Save the Access Key ID and Secret Access Key (needed for GitHub secrets)
```

### 3. Attach S3 Permissions to IAM User

Create a policy file named `s3-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::app-lts-test",
        "arn:aws:s3:::app-lts-test/*",
        "arn:aws:s3:::app-lts-prod",
        "arn:aws:s3:::app-lts-prod/*"
      ]
    }
  ]
}
```

Apply the policy:
```bash
aws iam put-user-policy --user-name github-actions-lts --policy-name s3-deploy --policy-document file://s3-policy.json
```

---

## 🔐 GitHub Secrets Setup

1. Go to: Repository → Settings → Secrets and variables → Actions
2. Add these secrets:

```
AWS_ACCESS_KEY_ID           = (from IAM user creation)
AWS_SECRET_ACCESS_KEY       = (from IAM user creation)
CLOUDFRONT_DISTRIBUTION_TEST = (optional - if using CloudFront)
CLOUDFRONT_DISTRIBUTION_PROD = (optional - if using CloudFront)
SLACK_WEBHOOK_URL           = (optional - for Slack notifications)
```

---

## 🔒 GitHub Branch Protection Rules

### Protect Main Branch

1. Go to: Repository → Settings → Branches
2. Add Branch Protection Rule for `main`:

**Settings:**
- ✅ Require a pull request before merging
- ✅ Dismiss stale pull request approvals when new commits are pushed
- ✅ Require approval from code owners
- ✅ Require status checks to pass before merging
  - Required checks: `CI/CD Pipeline`, `build-and-test`
- ✅ Restrict who can push to matching branches (select yourself)
- ❌ Allow force pushes (disabled)
- ❌ Allow deletions (disabled)

### Test Branch (Optional)

1. Add Branch Protection Rule for `test`:
- ✅ Require a pull request before merging
- ✅ Require status checks to pass before merging
- ✅ Require approval from code owners (optional)

---

## 📊 Deployment Flow

```
┌─────────────────────────────────────────────────────┐
│ dev branch                                          │
│ - Tests only (no deployment)                        │
│ - Private testing ground                            │
└─────────────┬───────────────────────────────────────┘
              │ Create PR: dev → test
              ↓
┌─────────────────────────────────────────────────────┐
│ test branch                                         │
│ - Auto deploys to: app-lts-test S3 bucket          │
│ - URL: https://app-lts-test.s3.amazonaws.com       │
│ - QA team tests here                                │
└─────────────┬───────────────────────────────────────┘
              │ Create PR: test → main
              │ (Requires approval)
              ↓
┌─────────────────────────────────────────────────────┐
│ main branch (PROTECTED)                             │
│ - Cannot push directly                              │
│ - Only merge from test branch                       │
│ - Auto deploys to: app-lts-prod S3 bucket          │
│ - URL: https://app-lts-prod.s3.amazonaws.com       │
│ - LIVE for users!                                   │
└─────────────────────────────────────────────────────┘
```

---

## 🚀 Deployment Workflows

### Test Deployment (`.github/workflows/deploy-test.yml`)
- **Triggers:** Push to `test` branch
- **Steps:**
  1. Build the project
  2. Deploy dist/ to `app-lts-test` bucket
  3. Post success comment on commit
  4. Invalidate CloudFront cache (optional)

### Production Deployment (`.github/workflows/deploy-prod.yml`)
- **Triggers:** Push to `main` branch OR manual workflow dispatch
- **Environment:** Requires GitHub Environment approval
- **Steps:**
  1. Build the project
  2. Verify build artifacts
  3. Deploy dist/ to `app-lts-prod` bucket
  4. Invalidate CloudFront cache (optional)
  5. Send Slack notification (optional)
  6. Post success comment on commit

---

## ✅ Required Secrets Summary

| Secret Name | Where to Get | Purpose |
|---|---|---|
| `AWS_ACCESS_KEY_ID` | IAM User Access Keys | AWS authentication |
| `AWS_SECRET_ACCESS_KEY` | IAM User Access Keys | AWS authentication |
| `CLOUDFRONT_DISTRIBUTION_TEST` | CloudFront console (optional) | CDN cache invalidation |
| `CLOUDFRONT_DISTRIBUTION_PROD` | CloudFront console (optional) | CDN cache invalidation |
| `SLACK_WEBHOOK_URL` | Slack App setup (optional) | Deployment notifications |

---

## 🧪 Testing the Setup

### Test Workflow (No Real Deployment Yet):
```bash
# Make a small change on test branch
git checkout test
echo "<!-- test -->" >> index.html
git add index.html
git commit -m "test: verify deployment workflow"
git push origin test

# Watch: Repository → Actions tab
# You should see deploy-test.yml running
```

### Production Workflow:
```bash
# Create PR from test → main
# Wait for approval
# Merge PR
# Watch Actions tab for deploy-prod.yml
```

---

## 🔧 Troubleshooting

**"Access Denied" errors:**
- Check AWS credentials are correct
- Verify IAM user has S3 permissions
- Check bucket names match exactly

**"Deployment failed" but tests passed:**
- Check AWS secrets are set in GitHub
- Verify bucket exists and is accessible
- Check IAM user has `s3:PutObject` and `s3:DeleteObject` permissions

**CloudFront invalidation fails (but S3 deploys succeed):**
- This is optional and doesn't block deployment
- Skip if you're not using CloudFront CDN

---

## 📚 Documentation Links

- [AWS S3 Static Website Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [GitHub Actions Environments](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)
- [AWS CLI S3 Commands](https://docs.aws.amazon.com/cli/latest/reference/s3/index.html)
