variable "aws_region" {
  description = "Regiao AWS para provisionar os recursos"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Nome do projeto usado para nomear recursos"
  type        = string
  default     = "devops-na-pratica"
}

variable "environment" {
  description = "Ambiente de deploy (dev, staging, production)"
  type        = string
  default     = "dev"
}

variable "instance_type" {
  description = "Tipo da instancia EC2"
  type        = string
  default     = "t2.micro"
}

variable "ami_id" {
  description = "AMI ID para a instancia EC2 (Amazon Linux 2)"
  type        = string
  default     = "ami-0c02fb55956c7d316"
}

variable "key_name" {
  description = "Nome do par de chaves SSH para acessar a instancia"
  type        = string
  default     = "devops-key"
}

variable "repo_url" {
  description = "URL do repositorio Git da aplicacao"
  type        = string
  default     = "https://github.com/usuario/devops-na-pratica.git"
}
