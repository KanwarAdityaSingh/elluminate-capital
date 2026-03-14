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
✅ Cache optimization configured

## Cache Configuration

The deployment script sets cache headers on S3 objects:
- **HTML files**: `no-cache, no-store, must-revalidate` (always fetch fresh content)
- **Static assets** (JS, CSS, fonts, images): `public, max-age=31536000, immutable` (cache for 1 year)

### CloudFront Cache Behavior Setup

To ensure CloudFront respects these headers, configure the distribution:

1. Go to **CloudFront Console** → Your Distribution → **Behaviors** tab
2. Edit the default behavior (or create path-specific behaviors)
3. Under **Cache key and origin requests**:
   - **Cache policy**: Use "CachingOptimized" or create custom policy
   - **Origin request policy**: Use "CORS-S3Origin" or "AllViewer"
   - **Response headers policy**: Use "SecurityHeadersPolicy" or create custom

4. For HTML files specifically, create a path pattern behavior:
   - **Path pattern**: `*.html` or `/index.html`
   - **Cache policy**: Create custom with:
     - **TTL**: 0 seconds (respect origin headers)
     - **Cache key**: Include query strings if needed
   - **Origin request policy**: "CORS-S3Origin"

5. **Important**: CloudFront will respect the `Cache-Control` headers set on S3 objects, but you may need to:
   - Set **Minimum TTL**: 0
   - Set **Maximum TTL**: 31536000 (for static assets)
   - Set **Default TTL**: 0 (to respect origin headers)

## Font Loading Configuration

If fonts appear different after deployment, ensure CloudFront is configured to forward CORS headers:

1. Go to CloudFront Console → Your Distribution → Behaviors
2. Edit the default behavior
3. Under "Cache key and origin requests", ensure:
   - **Origin request policy**: CORS-S3Origin (or create custom policy)
   - **Response headers policy**: Include CORS headers
4. Save and wait for deployment (5-15 minutes)

Alternatively, configure S3 bucket CORS:
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": [],
    "MaxAgeSeconds": 3000
  }
]
```

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

