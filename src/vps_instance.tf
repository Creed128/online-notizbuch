provider "aws" {
  region = "eu-central-1"  # Region, in der der VPS erstellt werden soll
}

resource "aws_instance" "vps" {
  ami           = "ami-0c55b159cbfafe1f0"  # AMI-ID Ihrer Wahl
  instance_type = "t2.micro"               # Instanztyp (z.B. t2.micro, t3.small, etc.)

  tags = {
    Name = "VPSInstance"                    # Name Ihrer Instanz
  }
}
