output "function_name" {
  description = "Name of the Lambda function."

  value = aws_lambda_function.crawler.function_name
}
