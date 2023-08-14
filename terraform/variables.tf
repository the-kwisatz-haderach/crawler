variable "main_zip_path" {
  type        = string
  description = "Path to the main zip file."
  default     = "../crawler.zip"
}

variable "vendor_zip_path" {
  type        = string
  description = "Path to the vendor zip file."
  default     = "../vendors.zip"
}

variable "s3_bucket_name" {
  type        = string
  description = "Name of the s3 bucket."
  default     = "preminuli-crawler"
}

