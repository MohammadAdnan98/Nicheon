using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nicheon.Domain.Entities
{
    public class AuthenticationModel
    {
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public string? Mobile { get; set; }
        public string? Password { get; set; }
        public string? Role { get; set; }
        public string? PANNo { get; set; }
        public int? otp { get; set; }

        public int? UserId { get; set; }


        // Seller fields
        public int? SellerTypeId { get; set; }
        public string? GSTIN { get; set; }
        public string? BusinessName { get; set; }
        public string? ShopNo { get; set; }
        public string? BuildingName { get; set; }
        public string? Landmark { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? Pincode { get; set; }

        // Buyer fields
        public int? Exprience { get; set; }
        public decimal? Capacity { get; set; }
    }

}
