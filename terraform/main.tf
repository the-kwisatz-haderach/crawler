resource "aws_lambda_function" "crawler" {
  function_name = "Crawler"

  s3_bucket   = aws_s3_bucket.lambda_bucket.id
  s3_key      = aws_s3_object.lambda_crawler.key
  timeout     = 900
  memory_size = 512

  runtime = "nodejs16.x"
  handler = "index.handler"
  layers  = ["arn:aws:lambda:eu-north-1:764866452798:layer:chrome-aws-lambda:33"]

  source_code_hash = filebase64sha256("${path.module}/../crawler.zip")

  depends_on = [aws_iam_role_policy_attachment.lambda_policy, aws_s3_object.lambda_crawler]

  role = aws_iam_role.lambda_exec.arn

  environment {
    variables = {
      MONGODB_URI = "super_secret"
      MONGODB_DB  = "preminuli"
    }
  }

  lifecycle {
    ignore_changes = [environment[0].variables]
  }
}

resource "aws_cloudwatch_log_group" "crawler" {
  name = "/aws/lambda/${aws_lambda_function.crawler.function_name}"

  retention_in_days = 30
  depends_on        = [aws_lambda_function.crawler]
}

resource "aws_iam_role" "lambda_exec" {
  name = "serverless_lambda"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Sid    = ""
      Principal = {
        Service = "lambda.amazonaws.com"
      }
      },
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

