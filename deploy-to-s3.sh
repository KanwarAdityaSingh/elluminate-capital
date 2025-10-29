#!/bin/bash

# AWS S3 Deployment Script for Elluminate Capital
# Usage: ./deploy-to-s3.sh [bucket-name] [cloudfront-distribution-id]

BUCKET_NAME=${1:-"your-bucket-name"}
DISTRIBUTION_ID=${2:-""}

if [ "$BUCKET_NAME" = "your-bucket-name" ]; then
  echo "❌ Error: Please provide your S3 bucket name"
  echo "Usage: ./deploy-to-s3.sh my-bucket-name [cloudfront-distribution-id]"
  exit 1
fi

echo "🚀 Starting deployment to S3..."
echo "📍 Bucket: s3://$BUCKET_NAME"
if [ -n "$DISTRIBUTION_ID" ]; then
  echo "☁️  CloudFront Distribution: $DISTRIBUTION_ID"
fi

# Sync all files from out/ to S3 (exclude .txt files as they're not needed)
echo ""
echo "📤 Uploading files to S3..."
aws s3 sync out/ s3://$BUCKET_NAME/ --delete --exact-timestamps --exclude "*.txt"

if [ $? -eq 0 ]; then
  echo "✅ Files uploaded successfully!"
  
  # Invalidate CloudFront cache if distribution ID is provided
  if [ -n "$DISTRIBUTION_ID" ]; then
    echo ""
    echo "🔄 Invalidating CloudFront cache..."
    aws cloudfront create-invalidation \
      --distribution-id $DISTRIBUTION_ID \
      --paths "/*"
    
    if [ $? -eq 0 ]; then
      echo "✅ CloudFront cache invalidated!"
    else
      echo "⚠️  Failed to invalidate CloudFront cache"
    fi
  fi
  
  echo ""
  echo "✨ Deployment complete!"
  echo "🌐 Your site should be live at: https://$BUCKET_NAME.s3.amazonaws.com/index.html"
  
  if [ -n "$DISTRIBUTION_ID" ]; then
    echo "🌍 Or via CloudFront: https://$(aws cloudfront get-distribution --id $DISTRIBUTION_ID --query 'Distribution.DomainName' --output text 2>/dev/null)"
  fi
else
  echo "❌ Upload failed!"
  exit 1
fi

