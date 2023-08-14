# data "archive_file" "source" {
#   type        = "zip"
#   source_file = "../index.js"
#   output_path = "../crawler.zip"
# }

resource "aws_s3_bucket" "lambda_bucket" {
  bucket = var.s3_bucket_name
}

resource "aws_s3_bucket_ownership_controls" "default" {
  bucket = aws_s3_bucket.lambda_bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_acl" "bucket_acl" {
  bucket     = aws_s3_bucket.lambda_bucket.id
  acl        = "private"
  depends_on = [aws_s3_bucket_ownership_controls.default]
}

resource "aws_s3_object" "lambda_crawler" {
  bucket      = aws_s3_bucket.lambda_bucket.id
  key         = "crawler"
  source      = "${path.module}/../crawler.zip"
  source_hash = filemd5("${path.module}/../crawler.zip")
  # etag        = filemd5("../crawler.zip")
}
