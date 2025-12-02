using Nicheon.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nicheon.Application.Interfaces
{
    public interface IBuyerHomeRepository
    {

       
            Task<IEnumerable<ProductSearchResultDto>> SearchProductsAsync(
                string? q,
                string? metalIds,
                string? styleIds,
                string? karats,
                decimal? minPrice,
                decimal? maxPrice,
                int? isHallmarked,
                string? sort,
                int page,
                int pageSize
            );


        Task<HomeMetadataDto> GetHomeMetadataAsync(int userId);

        Task<IEnumerable<TrendingDto>> GetTrendingProductsAsync(int days = 14, int limit = 12);
        Task<IEnumerable<RecommendationDto>> GetRecommendationsAsync(int? userId, int limit = 12);
        Task<IEnumerable<TopCategoryDto>> GetTopCategoriesAsync(int? userId, int limit = 8, int days = 30);
        Task RecordSearchTermAsync(int? userId, string searchTerm);
        Task<IEnumerable<TopSearchDto>> GetTopSearchesAsync(int days = 30, int limit = 10);
        Task<IEnumerable<BannerDto>> GetActiveBannersAsync();
        Task LogProductViewAsync(int? userId, int productId);



    }
}
