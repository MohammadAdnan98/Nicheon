using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nicheon.Application.DTOs
{
    public class BusinessProfileDto
    {
        public int BusinessId { get; set; }
        public int UserId { get; set; }

        public string FullName { get; set; }
        public string BusinessName { get; set; } = string.Empty;
        public string BusinessType { get; set; } = string.Empty;
        public string? GSTNumber { get; set; }
        public string? PAN { get; set; }
        public string? ContactPerson { get; set; }
        public string? ContactPhone { get; set; }
        public string? BusinessEmail { get; set; }
        public string? Address { get; set; }
        public string? Landmark { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? Country { get; set; }
        public string? Pincode { get; set; }
        public bool IsVerified { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public bool IsActive { get; set; }
        public string? ProfileLogo { get; set; }
    }

    public class UpdateBusinessProfileDto
    {
        public int BusinessId { get; set; }
        public string BusinessName { get; set; } = "";
        public string BusinessType { get; set; } = "";
        public string? GSTNumber { get; set; }
        public string? PAN { get; set; }
        public string? fullName { get; set; }
        public string? ContactPhone { get; set; }
        public string? BusinessEmail { get; set; }
        public string? Address { get; set; }
        public string? Landmark { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? Country { get; set; }
        public string? Pincode { get; set; }

        public IFormFile? LogoFile { get; set; }

    }
}

