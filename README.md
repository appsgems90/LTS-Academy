
  # LTS Academy Mobile App Design

  This is a code bundle for LTS Academy Mobile App Design. The original project is available at https://www.figma.com/design/1ZuHhaf7sHBIjaFvGvsez9/LTS-Academy-Mobile-App-Design.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Development Workflow

  ### Branches
  - `main` - ⚠️ **PROTECTED** Production branch (cannot push directly)
  - `test` - Testing/QA branch (auto-deploys to test S3)
  - `dev` - Development branch (tests only, no deployment)

  ### CI/CD & Deployment
  
  **Three-Stage Deployment:**
  ```
  dev branch (Test)
      ↓ PR
  test branch (S3 Test) → https://app-lts-test.s3.amazonaws.com
      ↓ PR (with approval)
  main branch (S3 Prod) → https://app-lts-prod.s3.amazonaws.com
  ```

  #### CI Pipeline (`.github/workflows/ci.yml`)
  - Runs on: `main`, `dev`, `test` pushes
  - Steps: Install → Lint → Build → Test → Upload artifacts

  #### Test Deployment (`.github/workflows/deploy-test.yml`)
  - Runs on: `test` branch push
  - Deploys: `dist/` → `app-lts-test` S3 bucket
  - URL: https://app-lts-test.s3.amazonaws.com

  #### Production Deployment (`.github/workflows/deploy-prod.yml`)
  - Runs on: `main` branch push (requires approval)
  - Deploys: `dist/` → `app-lts-prod` S3 bucket
  - URL: https://app-lts-prod.s3.amazonaws.com
  - **Protection**: Cannot push directly to `main` (PR + approval required)

  ### Required Secrets
  - `AWS_ACCESS_KEY_ID` - IAM user access key
  - `AWS_SECRET_ACCESS_KEY` - IAM user secret key
  - `CLOUDFRONT_DISTRIBUTION_TEST` (optional) - CloudFront distribution ID
  - `CLOUDFRONT_DISTRIBUTION_PROD` (optional) - CloudFront distribution ID
  - `SLACK_WEBHOOK_URL` (optional) - For deployment notifications

  ### Setup Guide
  See [AWS_DEPLOYMENT_GUIDE.md](AWS_DEPLOYMENT_GUIDE.md) for complete AWS S3 setup instructions.

  ### Contributing Workflow
  1. Create feature branch from `dev`
  2. Make changes and test locally: `npm run dev`
  3. Push to `dev` branch for CI validation
  4. Create PR: `dev` → `test` (auto-deploys to test S3)
  5. QA tests the changes at https://app-lts-test.s3.amazonaws.com
  6. Create PR: `test` → `main` (requires approval)
  7. Approver reviews and merges
  8. Auto-deploys to production at https://app-lts-prod.s3.amazonaws.com