#!/bin/bash
# Deploy Vite build output to AWS S3
BUCKET="app-lts-dev"
DIST_DIR="dist"

if [ ! -d "$DIST_DIR" ]; then
  echo "Build directory '$DIST_DIR' not found. Run 'npm run build' first."
  exit 1
fi

aws s3 sync "$DIST_DIR" "s3://$BUCKET" --delete

echo "Deployment complete!"
