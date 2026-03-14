#!/bin/bash

# Build and Deploy Script for Elluminate Capital
# This script builds the static site and deploys to S3 + CloudFront

set -e

BUCKET_NAME="elluminate-frontend"
DISTRIBUTION_ID="E2786X7INI8YJT"

echo "🚀 Building static site..."
echo ""

# Build the static site
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed!"
  exit 1
fi

echo ""
echo "📤 Deploying to S3..."

# Upload static assets with long cache (JS, CSS, images, etc.) - exclude HTML files
echo "📦 Uploading static assets with cache..."
aws s3 sync out/ s3://$BUCKET_NAME/ \
  --delete \
  --region ap-south-1 \
  --exclude "*.txt" \
  --exclude "*.html" \
  --exclude "*/*.html" \
  --exclude "*/*/*.html" \
  --exclude "*/*/*/*.html" \
  --cache-control "public, max-age=31536000, immutable"

if [ $? -ne 0 ]; then
  echo "❌ S3 deployment failed!"
  exit 1
fi

# Upload HTML files with no-cache headers
echo "📄 Uploading HTML files with no-cache..."
find out -name "*.html" -type f 2>/dev/null | while read htmlfile; do
  s3path=${htmlfile#out/}
  # Remove leading slash if present
  s3path=${s3path#/}
  aws s3 cp "$htmlfile" "s3://$BUCKET_NAME/$s3path" \
    --region ap-south-1 \
    --content-type "text/html; charset=utf-8" \
    --cache-control "no-cache, no-store, must-revalidate" \
    --expires "0" \
    --metadata-directive REPLACE \
    --quiet 2>/dev/null || true
done

# Set correct Content-Type and cache headers for font files
echo "🔤 Setting font file headers..."
find out/_next/static/media -name "*.woff2" -type f 2>/dev/null | while read fontfile; do
  s3path=${fontfile#out/}
  aws s3 cp "$fontfile" "s3://$BUCKET_NAME/$s3path" \
    --region ap-south-1 \
    --content-type "font/woff2" \
    --cache-control "public, max-age=31536000, immutable" \
    --metadata-directive REPLACE \
    --quiet 2>/dev/null || true
done

# Set cache headers for other static assets
echo "🎨 Setting cache headers for other assets..."
# CSS files
find out/_next/static -name "*.css" -type f 2>/dev/null | while read cssfile; do
  s3path=${cssfile#out/}
  aws s3 cp "$cssfile" "s3://$BUCKET_NAME/$s3path" \
    --region ap-south-1 \
    --content-type "text/css" \
    --cache-control "public, max-age=31536000, immutable" \
    --metadata-directive REPLACE \
    --quiet 2>/dev/null || true
done

# JS files
find out/_next/static -name "*.js" -type f 2>/dev/null | while read jsfile; do
  s3path=${jsfile#out/}
  aws s3 cp "$jsfile" "s3://$BUCKET_NAME/$s3path" \
    --region ap-south-1 \
    --content-type "application/javascript" \
    --cache-control "public, max-age=31536000, immutable" \
    --metadata-directive REPLACE \
    --quiet 2>/dev/null || true
done

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

