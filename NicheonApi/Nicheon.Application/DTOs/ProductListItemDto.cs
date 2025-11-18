using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nicheon.Application.DTOs
{
    public class ProductListItemDto
    {
        public int ProductId { get; set; }
        public int BusinessId { get; set; }
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public string? ShortDescription { get; set; }
        public string? Description { get; set; }
        public string? Karat { get; set; }
        public decimal? WeightGrams { get; set; }
        public decimal? PricePerGram { get; set; }
        public decimal? MakingCharges { get; set; }
        public int MOQ { get; set; }
        public int Stock { get; set; }
        public bool IsHallmarked { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? ThumbnailUrl { get; set; }
        public int TotalRecords { get; set; }
    }
}

