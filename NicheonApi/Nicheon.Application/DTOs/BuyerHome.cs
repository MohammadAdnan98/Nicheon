using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nicheon.Application.DTOs
{
    public class BuyerHome
    {
    }

    public class ProductSearchResultDto
    {
        public int TotalCount { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; } = "";
        public string? ShortDescription { get; set; }
        public decimal? PricePerGram { get; set; }
        public decimal? MakingCharges { get; set; }
        public decimal? WeightGrams { get; set; }
        public string? Karat { get; set; }
        public bool IsHallmarked { get; set; }
        public string? ImageUrl { get; set; }
        public int BusinessId { get; set; }
        public string? BusinessName { get; set; }
        public int TotalOrderedQty { get; set; }
    }
}
