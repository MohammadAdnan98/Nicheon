using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nicheon.Application.DTOs
{
    public class AdminBuyerDto
    {
        public int UserId { get; set; }
        public string FullName { get; set; } = "";
        public string PrimaryEmail { get; set; } = "";
        public string PrimaryPhone { get; set; } = "";
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
    }

}
