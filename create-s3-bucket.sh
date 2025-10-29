#!/bin/bash

# Create S3 Bucket for Static Website Hosting
# Usage: ./create-s3-bucket.sh [bucket-name] [region]

BUCKET_NAME=${1:-""}
REGION=${2:-"us-east-1"}

if [ -z "$BUCKET_NAME" ]; then
  echo "❌ Error: Please provide a bucket name"
  echo ""
  echo "Usage: ./create-s3-bucket.sh [bucket-name] [region]"
  echo ""
  echo "Example:"
  echo "  ./create-s3-bucket.sh elluminate-capital-website us-east-1"
  echo ""
  echo "Available regions:"
  echo "  us-east-1 (N. Virginia)"
  echo "  us-west-2 (Oregon)"
  echo "  eu-west-1 (Ireland)"
  echo "  ap-south-1 (Mumbai)"
  exit 1
fi

echo "🚀 Creating S3 bucket for static website hosting..."
echo "📦 Bucket name: $BUCKET_NAME"
echo "🌍 Region: $REGION"
echo ""

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
  echo "❌ AWS CLI is not installed. Please install it first:"
  echo "   https://aws.amazon.com/cli/"
  exit 1
fi

# Check if AWS credentials are configured
if ! aws sts get-caller-identity &> /dev/null; then
  echo "❌ AWS credentials not configured. Please run:"
  echo "   aws configure"
  exit 1
fi

# Create the bucket
echo "📤 Creating bucket..."
if aws s3 mb s3://$BUCKET_NAME --region $REGION 2>&1 | grep -q "AlreadyExists"; then
  echo "⚠️  Bucket already exists. Continuing with configuration..."
elif [ $? -ne 0 ]; then
  echo "❌ Failed to create bucket"
  exit 1
else
  echo "✅ Bucket created successfully!"
fi

# Configure for static website hosting
echo ""
echo "🌐 Configuring static website hosting..."
aws s3 website s3://$BUCKET_NAME \
  --index-document index.html \
  --error-document 404.html

if [ $? -eq 0 ]; then
  echo "✅ Website hosting configured!"
else
  echo "❌ Failed to configure website hosting"
  exit 1
fi

# Remove public access block
echo ""
echo "🔓 Removing public access block..."
aws s3api put-public-access-block \
  --bucket $BUCKET_NAME \
  --public-access-block-configuration \
  "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

if [ $? -eq 0 ]; then
  echo "✅ Public access configured!"
else
  echo "⚠️  Warning: Could not update public access block. You may need to do this manually in AWS Console."
fi

# Set bucket policy for public read access
echo ""
echo "📝 Setting bucket policy..."
cat > /tmp/bucket-policy-$BUCKET_NAME.json << EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::${BUCKET_NAME}/*"
    }
  ]
}
EOF

aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy file:///tmp/bucket-policy-$BUCKET_NAME.json

if [ $? -eq 0 ]; then
  echo "✅ Bucket policy set!"
  rm /tmp/bucket-policy-$BUCKET_NAME.json
else
  echo "⚠️  Warning: Could not set bucket policy. You may need to do this manually in AWS Console."
  rm /tmp/bucket-policy-$BUCKET_NAME.json
fi

# Get website endpoint
WEBSITE_ENDPOINT="http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"

echo ""
echo "✨ Bucket setup complete!"
echo ""
echo "📋 Summary:"
echo "   Bucket name: $BUCKET_NAME"
echo "   Region: $REGION"
echo "   Website URL: $WEBSITE_ENDPOINT"
echo ""
echo "🚀 Next steps:"
echo "   1. Deploy your site:"
echo "      ./deploy-to-s3.sh $BUCKET_NAME"
echo ""
echo "   2. Visit your site:"
echo "      $WEBSITE_ENDPOINT"
echo ""
echo "   3. (Optional) Set up CloudFront for HTTPS and custom domain"

