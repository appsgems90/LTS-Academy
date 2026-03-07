# LTS Academy – Development Workflow

## Purpose
This document defines how code is developed, tested, and deployed for the LTS Academy application.

---

## Branch Strategy

We use three main branches:

- main → Production
- test → Staging
- dev → Development

Feature branches are created from `dev`.

Example:
feature/progress-module

---

## Development Flow

1. Create feature branch from dev
2. Develop locally in VS Code
3. Push feature branch to GitHub
4. Create Pull Request → merge into dev
5. Auto deploy to DEV environment
6. Merge dev → test for staging validation
7. Merge test → main for production release

---

## CI/CD Flow

GitHub Actions handles deployment automatically.

Branch → Environment Mapping:

- dev → lts-dev S3
- test → lts-test S3
- main → lts-prod S3

Deployment uses:
aws s3 sync build/ s3://bucket-name

---

## Environments

Each environment has:

- Separate S3 bucket
- Separate configuration
- Separate API endpoints (future)

---

## Secrets Management

Secrets stored in GitHub:

- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- AWS_REGION

Never store credentials in code.

---

## Future Improvements

- Infrastructure as Code (Terraform)
- Automated backend deployments
- Test coverage enforcement
- Branch protection rules