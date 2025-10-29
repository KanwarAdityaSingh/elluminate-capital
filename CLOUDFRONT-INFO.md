# CloudFront Distribution Information

## Distribution Details
- **Distribution ID:** `E2786X7INI8YJT`
- **CloudFront Domain:** `d1b9n0vp0rmlcy.cloudfront.net`
- **S3 Origin:** `elluminate-frontend.s3-website-ap-south-1.amazonaws.com`
- **Region:** ap-south-1 (Mumbai)

## Access Your Site

### CloudFront URL (Recommended - HTTPS enabled)
```
https://d1b9n0vp0rmlcy.cloudfront.net
```

**Note:** Distribution is deploying. It typically takes 5-15 minutes to be fully active.

### S3 Website Endpoint (Fallback)
```
http://elluminate-frontend.s3-website-ap-south-1.amazonaws.com
```

### S3 REST Endpoint (Direct access)
```
https://elluminate-frontend.s3.ap-south-1.amazonaws.com/index.html
```

## Deployment Command

With CloudFront cache invalidation:
```bash
./deploy-to-s3.sh elluminate-frontend E2786X7INI8YJT
```

Without CloudFront (just S3):
```bash
./deploy-to-s3.sh elluminate-frontend
```

## Check Distribution Status

```bash
aws cloudfront get-distribution --id E2786X7INI8YJT --query 'Distribution.Status' --output text
```

When status shows "Deployed", your CloudFront URL will be fully active.

## CloudFront Features Configured

✅ HTTPS enabled (redirects HTTP to HTTPS)
✅ Gzip compression enabled
✅ Custom 404 error page handling
✅ Global CDN (PriceClass_100 - US, Canada, Europe, Asia)
✅ Cache optimization (1 day default TTL)

## Next Steps (Optional)

1. **Add Custom Domain:**
   - Request SSL certificate in AWS Certificate Manager
   - Add alternate domain name (CNAME) in CloudFront distribution settings
   - Update DNS records to point to CloudFront

2. **Monitor Usage:**
   - Check CloudFront metrics in AWS Console
   - Monitor bandwidth and requests

3. **Optimize Caching:**
   - Adjust TTL values if needed
   - Configure additional cache behaviors for specific paths

