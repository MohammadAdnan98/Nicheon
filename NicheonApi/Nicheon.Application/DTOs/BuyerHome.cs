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
    }

    public class HomeMetadataDto
    {
        public IEnumerable<MetalDto> Metals { get; set; }
        public IEnumerable<CategoryDto> Categories { get; set; }
        public IEnumerable<TopSellerDto> TopSellers { get; set; }
        public IEnumerable<FeaturedProductDto> Featured { get; set; }
        public IEnumerable<RecentlyViewedDto> RecentlyViewed { get; set; }
    }

    public class MetalDto
    {
        public int MetalId { get; set; }
        public string MetalName { get; set; }
    }

    public class CategoryDto
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
    }

    public class TopSellerDto
    {
        public int BusinessId { get; set; }
        public string BusinessName { get; set; }
        public int ProductCount { get; set; }
    }

    public class FeaturedProductDto
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public decimal? PricePerGram { get; set; }
        public string? ThumbnailUrl { get; set; }
        public string? BusinessName { get; set; }
    }

    public class RecentlyViewedDto
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string? ShortDescription { get; set; }
        public decimal? PricePerGram { get; set; }
        public string? ThumbnailUrl { get; set; }
        public string? BusinessName { get; set; }
        public DateTime ViewedAt { get; set; }
    }
    public class TrendingDto
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; } = "";
        public decimal? PricePerGram { get; set; }
        public string? ThumbnailUrl { get; set; }
        public int ViewCount { get; set; }
    }

    public class RecommendationDto
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; } = "";
        public decimal? PricePerGram { get; set; }
        public string? ThumbnailUrl { get; set; }
    }

    public class TopCategoryDto
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; } = "";
        public int ViewCount { get; set; }
    }

    public class TopSearchDto
    {
        public string SearchTerm { get; set; } = "";
        public int Hits { get; set; }
    }

    public class BannerDto
    {
        public int BannerId { get; set; }
        public string? Title { get; set; }
        public string ImageUrl { get; set; } = "";
        public string? TargetUrl { get; set; }
    }


}
