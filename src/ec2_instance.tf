provider "aws" {
  region = "eu-central-1"  # Region, in der die EC2-Instanz erstellt werden soll
}

resource "aws_instance" "example" {
  ami           = "ami-0c55b159cbfafe1f0"  # AMI-ID Ihrer Wahl
  instance_type = "t2.micro"               # Instanztyp (z.B. t2.micro, t3.small, etc.)

  tags = {
    Name = "ExampleInstance"                # Name Ihrer Instanz
  }
}
