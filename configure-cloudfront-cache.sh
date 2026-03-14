#!/bin/bash

# CloudFront Cache Configuration Script
# This script configures CloudFront to respect no-cache headers via CLI

set -e

DISTRIBUTION_ID="E2786X7INI8YJT"
TEMP_DIR=$(mktemp -d)
CONFIG_FILE="$TEMP_DIR/distribution-config.json"

# Cleanup function
cleanup() {
  rm -rf "$TEMP_DIR"
}
trap cleanup EXIT

echo "🔍 Fetching current CloudFront distribution configuration..."
echo ""

# Get current distribution config and ETag
aws cloudfront get-distribution-config \
  --id $DISTRIBUTION_ID \
  --output json > "$CONFIG_FILE" 2>/dev/null

ETAG=$(jq -r '.ETag' "$CONFIG_FILE")
DIST_CONFIG=$(jq -r '.DistributionConfig' "$CONFIG_FILE")

if [ -z "$ETAG" ] || [ "$ETAG" = "null" ]; then
  echo "❌ Failed to get distribution config!"
  exit 1
fi

echo "✅ Current configuration retrieved (ETag: $ETAG)"
echo ""

# Show current settings
echo "📊 Current cache settings:"
jq -r '.DefaultCacheBehavior | {
  MinTTL: .MinTTL,
  MaxTTL: .MaxTTL,
  DefaultTTL: .DefaultTTL,
  CachePolicyId: .CachePolicyId,
  ForwardedValues: (if .ForwardedValues then "Legacy" else "Policy-based" end)
}' "$CONFIG_FILE" | jq '.'

echo ""
echo "⚙️  Updating cache behavior settings..."
echo "  - Minimum TTL: 0 (respect no-cache headers)"
echo "  - Maximum TTL: 31536000 (1 year for static assets)"
echo "  - Default TTL: 0 (respect origin Cache-Control headers)"
echo ""

# Check if using legacy ForwardedValues or modern CachePolicy
USING_POLICY=$(echo "$DIST_CONFIG" | jq -r '.DefaultCacheBehavior.CachePolicyId // empty')

if [ -n "$USING_POLICY" ] && [ "$USING_POLICY" != "null" ]; then
  echo "⚠️  Distribution is using Cache Policy: $USING_POLICY"
  echo "   To respect origin headers, you need to either:"
  echo "   1. Use 'CachingOptimized' policy (respects origin Cache-Control)"
  echo "   2. Create a custom cache policy with MinTTL=0, MaxTTL=31536000, DefaultTTL=0"
  echo ""
  echo "   Updating TTL overrides (if supported)..."
  # Update TTL overrides even when using cache policy
  UPDATED_CONFIG=$(echo "$DIST_CONFIG" | jq '
    .DefaultCacheBehavior.MinTTL = 0 |
    .DefaultCacheBehavior.MaxTTL = 31536000 |
    .DefaultCacheBehavior.DefaultTTL = 0
  ')
else
  echo "📝 Using legacy cache settings (ForwardedValues)..."
  # Update legacy cache behavior settings
  UPDATED_CONFIG=$(echo "$DIST_CONFIG" | jq '
    .DefaultCacheBehavior.MinTTL = 0 |
    .DefaultCacheBehavior.MaxTTL = 31536000 |
    .DefaultCacheBehavior.DefaultTTL = 0 |
    .DefaultCacheBehavior.ForwardedValues.Headers.Quantity = 0 |
    .DefaultCacheBehavior.ForwardedValues.QueryString = false |
    .DefaultCacheBehavior.ForwardedValues.Cookies.Forward = "none"
  ')
fi

# Save updated config
echo "$UPDATED_CONFIG" > "$CONFIG_FILE"

# Update the distribution
echo "🔄 Applying changes to CloudFront distribution..."
UPDATE_RESULT=$(aws cloudfront update-distribution \
  --id $DISTRIBUTION_ID \
  --distribution-config file://"$CONFIG_FILE" \
  --if-match "$ETAG" \
  --output json 2>&1)

if [ $? -eq 0 ]; then
  echo "✅ CloudFront cache settings updated successfully!"
  echo ""
  echo "📝 New settings:"
  echo "$UPDATE_RESULT" | jq -r '.Distribution.DistributionConfig.DefaultCacheBehavior | {
    MinTTL: .MinTTL,
    MaxTTL: .MaxTTL,
    DefaultTTL: .DefaultTTL
  }' | jq '.'
  echo ""
  echo "⏳ CloudFront is deploying the changes..."
  echo "   This typically takes 5-15 minutes."
  echo "   Check status with: aws cloudfront get-distribution --id $DISTRIBUTION_ID --query 'Distribution.Status'"
else
  echo "❌ Failed to update distribution!"
  echo "$UPDATE_RESULT"
  exit 1
fi

echo ""
echo "💡 Note: For HTML files specifically, you may want to create a separate cache behavior"
echo "   with path pattern '*.html' and all TTLs set to 0. This can be done via AWS Console"
echo "   or by extending this script."

