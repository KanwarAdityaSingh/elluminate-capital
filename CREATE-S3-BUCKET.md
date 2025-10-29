# Creating an S3 Bucket for Static Website Hosting

## Option 1: Using AWS Console (Visual - Recommended for first time)

1. **Go to AWS S3 Console**:
   - Visit: https://s3.console.aws.amazon.com/
   - Or search "S3" in AWS Console

2. **Click "Create bucket"**

3. **Configure the bucket**:
   - **Bucket name**: Choose a unique name (e.g., `elluminate-capital-website`)
     - Must be globally unique across all AWS accounts
     - Use lowercase letters, numbers, and hyphens only
     - Example: `elluminate-capital-2024` or `elluminate-capital-production`
   
   - **AWS Region**: Choose closest to your users (e.g., `us-east-1`, `us-west-2`, `eu-west-1`)
   
   - **Object Ownership**: Keep default "ACLs disabled (recommended)"

4. **Uncheck "Block all public access"**:
   - This is REQUIRED for static website hosting
   - Check the box that says "I acknowledge that the current settings might make this bucket public"
   
5. **Versioning**: Optional (leave disabled for now)

6. **Default encryption**: Leave default (enabled)

7. **Click "Create bucket"**

8. **Configure static website hosting** (after bucket is created):
   - Click on your bucket name
   - Go to "Properties" tab
   - Scroll to "Static website hosting"
   - Click "Edit"
   - Enable it
   - Set:
     - **Index document**: `index.html`
     - **Error document**: `404.html`
   - Click "Save changes"

9. **Set bucket policy** (to allow public read access):
   - Go to "Permissions" tab
   - Scroll to "Bucket policy"
   - Click "Edit"
   - Paste this policy (replace `YOUR-BUCKET-NAME` with your actual bucket name):
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
       }
     ]
   }
   ```
   - Click "Save changes"

10. **Note your bucket website endpoint**:
    - In "Properties" → "Static website hosting"
    - You'll see a URL like: `http://YOUR-BUCKET-NAME.s3-website-us-east-1.amazonaws.com`
    - This is your website URL (use CloudFront for HTTPS and custom domain later)

## Option 2: Using AWS CLI (Command Line)

Run these commands (replace `elluminate-capital-website` with your desired bucket name):

```bash
# Set your bucket name
BUCKET_NAME="elluminate-capital-website"
REGION="us-east-1"  # Change to your preferred region

# Create the bucket
aws s3 mb s3://$BUCKET_NAME --region $REGION

# Configure for static website hosting
aws s3 website s3://$BUCKET_NAME \
  --index-document index.html \
  --error-document 404.html

# Set bucket policy for public read access
cat > bucket-policy.json << EOF
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

aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy file://bucket-policy.json

# Remove public access block
aws s3api put-public-access-block \
  --bucket $BUCKET_NAME \
  --public-access-block-configuration \
  "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

# Clean up
rm bucket-policy.json

echo "✅ Bucket created: $BUCKET_NAME"
echo "🌐 Website URL: http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"
```

## Important Notes

- **Bucket name must be globally unique** - try variations if yours is taken
- **Region selection**: Choose closest to your users for best performance
- **Public access**: Required for static website hosting (only for reading files)
- **HTTPS**: S3 website endpoints only support HTTP. Use CloudFront for HTTPS.

## Next Steps

After creating the bucket:

1. Test deployment:
   ```bash
   ./deploy-to-s3.sh your-bucket-name
   ```

2. Visit your site:
   - Check "Static website hosting" endpoint in S3 console
   - Or: `http://your-bucket-name.s3-website-region.amazonaws.com`

3. (Optional) Set up CloudFront for HTTPS and custom domain

