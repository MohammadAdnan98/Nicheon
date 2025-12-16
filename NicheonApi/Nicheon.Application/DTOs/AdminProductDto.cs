using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nicheon.Application.DTOs
{
    public class AdminProductDto
    {
        public int ProductId { get; set; }
        public string ProductCode { get; set; } = "";
        public string ProductName { get; set; } = "";
        public decimal? PricePerGram { get; set; }
        public decimal? MakingCharges { get; set; }
        public int Stock { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }

        public int BusinessId { get; set; }
        public string BusinessName { get; set; } = "";
        public string? CategoryName { get; set; }
    }
}
