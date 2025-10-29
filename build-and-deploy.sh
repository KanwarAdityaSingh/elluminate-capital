#!/bin/bash

# Build and Deploy Script for Elluminate Capital
# This script builds with production backend URL and deploys to S3 + CloudFront

set -e

BACKEND_URL=${1:-"http://13.127.116.168"}
BUCKET_NAME="elluminate-frontend"
DISTRIBUTION_ID="E2786X7INI8YJT"

echo "🚀 Building with backend URL: $BACKEND_URL"
echo ""

# Build with environment variables
NEXT_PUBLIC_API_URL=$BACKEND_URL \
NEXT_PUBLIC_API_BASE_URL=$BACKEND_URL \
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed!"
  exit 1
fi

echo ""
echo "📤 Deploying to S3..."
aws s3 sync out/ s3://$BUCKET_NAME/ --delete --region ap-south-1 --exclude "*.txt"

if [ $? -ne 0 ]; then
  echo "❌ S3 deployment failed!"
  exit 1
fi

echo ""
echo "🔄 Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
  --distribution-id $DISTRIBUTION_ID \
  --paths "/*" \
  --region ap-south-1 > /dev/null 2>&1

if [ $? -eq 0 ]; then
  echo "✅ CloudFront cache invalidated!"
else
  echo "⚠️  CloudFront invalidation failed (continuing anyway)"
fi

echo ""
echo "✨ Deployment complete!"
echo ""
echo "🌐 Your site is live at:"
echo "   CloudFront: https://d1b9n0vp0rmlcy.cloudfront.net"
echo "   S3 Website: http://elluminate-frontend.s3-website-ap-south-1.amazonaws.com"
echo ""
echo "📝 Frontend is configured to use backend at: $BACKEND_URL"

