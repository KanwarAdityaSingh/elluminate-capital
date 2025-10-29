#!/bin/bash

# AWS Credentials Setup Script
# This will help you configure AWS CLI with your credentials

echo "🔐 AWS Credentials Setup"
echo ""
echo "This script will help you configure AWS CLI."
echo ""
echo "You'll need:"
echo "  - AWS Access Key ID"
echo "  - AWS Secret Access Key"
echo ""
read -p "Press Enter to continue or Ctrl+C to cancel..."

echo ""
echo "Please enter your AWS Access Key ID:"
read -s AWS_ACCESS_KEY_ID

echo ""
echo "Please enter your AWS Secret Access Key:"
read -s AWS_SECRET_ACCESS_KEY

echo ""
echo "Setting default region to ap-south-1 (Mumbai)..."
echo ""

# Create AWS config directory if it doesn't exist
mkdir -p ~/.aws

# Create credentials file
cat > ~/.aws/credentials << EOF
[default]
aws_access_key_id = $AWS_ACCESS_KEY_ID
aws_secret_access_key = $AWS_SECRET_ACCESS_KEY
EOF

# Create config file
cat > ~/.aws/config << EOF
[default]
region = ap-south-1
output = json
EOF

# Set proper permissions
chmod 600 ~/.aws/credentials
chmod 600 ~/.aws/config

echo ""
echo "✅ AWS credentials configured successfully!"
echo ""
echo "Verifying configuration..."
aws sts get-caller-identity

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Configuration verified! You're ready to use AWS CLI."
  echo ""
  echo "Next steps:"
  echo "  1. List your S3 buckets: aws s3 ls"
  echo "  2. Deploy your site: ./deploy-to-s3.sh your-bucket-name"
else
  echo ""
  echo "❌ Configuration failed. Please check your credentials."
fi

