
  # LTS Academy Mobile App Design

  This is a code bundle for LTS Academy Mobile App Design. The original project is available at https://www.figma.com/design/1ZuHhaf7sHBIjaFvGvsez9/LTS-Academy-Mobile-App-Design.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Development Workflow

  ### Branches
  - `main` - Production-ready code
  - `dev` - Development branch for new features
  - `test` - Testing branch for QA and integration testing

  ### CI/CD
  - **CI Pipeline**: Runs on pushes to `main`, `dev`, and `test` branches
    - Installs dependencies
    - Runs linting (if configured)
    - Builds the project
    - Runs tests (if available)
    - Uploads build artifacts

  - **Deployment**: Automatically deploys to Vercel/Netlify on successful builds to `main`
    - Requires `VERCEL_TOKEN`, `NETLIFY_AUTH_TOKEN`, and `NETLIFY_SITE_ID` secrets

  ### Contributing
  1. Create feature branch from `dev`
  2. Make changes and test locally
  3. Push to `dev` branch for CI validation
  4. Create pull request to merge into `main`