using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nicheon.Application.DTOs
{
    public class AdminSellerDto
    {
        public int UserId { get; set; }
        public int BusinessId { get; set; }
        public string FullName { get; set; } = "";
        public string PrimaryEmail { get; set; } = "";
        public string PrimaryPhone { get; set; } = "";
        public bool IsVerified { get; set; }
        public bool IsActive { get; set; }
        public string BusinessName { get; set; } = "";
        public string BusinessType { get; set; } = "";
        public string? GSTNumber { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public DateTime CreatedAt { get; set; }
    }

}
