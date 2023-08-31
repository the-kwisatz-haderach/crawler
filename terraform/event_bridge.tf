resource "aws_cloudwatch_event_rule" "crawl" {
  name                = "crawl-schedule-event"
  description         = "Scheduled to run every day"
  schedule_expression = "rate(1 day)"
}

resource "aws_cloudwatch_event_target" "crawl" {
  for_each = toset(["obavijest-o-smrti", "posljednje-zbogom", "posljednji-pozdrav", "sjecanje", "zahvale"])
  arn      = aws_lambda_function.crawler.arn
  rule     = aws_cloudwatch_event_rule.crawl.name
  input = jsonencode({
    type = each.key
  })
}

resource "aws_lambda_permission" "allow_cloudwatch_to_call_rw_fallout_retry_step_deletion_lambda" {
  statement_id  = "AllowExecutionFromCloudWatch"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.crawler.arn
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.crawl.arn
}
