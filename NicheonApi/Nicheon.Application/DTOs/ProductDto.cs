using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nicheon.Application.DTOs
{
    public class ProductCreateDto
    {
        public int BusinessId { get; set; }
        public int? CategoryId { get; set; }
        public int? MetalId { get; set; }
        public int? JewelleryTypeId { get; set; }
        public int? SubTypeId { get; set; }
        public int? StyleId { get; set; }
        public string ProductCode { get; set; } = string.Empty;
        public string ProductName { get; set; } = string.Empty;
        public string? ShortDescription { get; set; }
        public string? Description { get; set; }
        public string? Gender { get; set; }
        public string? Colour { get; set; }
        public string? Karat { get; set; }
        public decimal? WeightGrams { get; set; }
        public decimal? PricePerGram { get; set; }
        public decimal? MakingCharges { get; set; }
        public int MOQ { get; set; } = 1;
        public int Stock { get; set; } = 0;
        public bool IsHallmarked { get; set; } = false;
    }
}
