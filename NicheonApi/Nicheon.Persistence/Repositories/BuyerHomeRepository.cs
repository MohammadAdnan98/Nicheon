using Dapper;
using Nicheon.Application.DTOs;
using Nicheon.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nicheon.Persistence.Repositories
{
    public class BuyerHomeRepository : IBuyerHomeRepository
    {
        private readonly IDbConnection _db;

        public BuyerHomeRepository(IDbConnection db)
        {
            _db = db;
        }

        public async Task<IEnumerable<ProductSearchResultDto>> SearchProductsAsync(
    string? q,
    string? metalIds,
    string? styleIds,        // MAPPED to CategoryIds
    string? karats,
    decimal? minPrice,
    decimal? maxPrice,
    int? isHallmarked,
    string? sort,
    int page,
    int pageSize
)
        {
            var p = new DynamicParameters();
            p.Add("@Search", q);
            p.Add("@MetalIds", metalIds);
            p.Add("@CategoryIds", styleIds);
            p.Add("@Karat", karats);
            p.Add("@MinPrice", minPrice);
            p.Add("@MaxPrice", maxPrice);
            p.Add("@SortBy", sort);
            p.Add("@Page", page);
            p.Add("@PageSize", pageSize);

            var result = await _db.QueryAsync<ProductSearchResultDto>(
                "sp_BuyerHome_GetProducts",
                p,
                commandType: CommandType.StoredProcedure
            );

            return result;
        }

        public async Task<HomeMetadataDto> GetHomeMetadataAsync(int userId)
        {
            var result = new HomeMetadataDto();

            using var multi = await _db.QueryMultipleAsync(
                "sp_BuyerHome_GetHomeMetadata",
                new { UserId = userId },
                commandType: CommandType.StoredProcedure
            );

            result.Metals = await multi.ReadAsync<MetalDto>();
            result.Categories = await multi.ReadAsync<CategoryDto>();
            result.TopSellers = await multi.ReadAsync<TopSellerDto>();
            result.Featured = await multi.ReadAsync<FeaturedProductDto>();
            result.RecentlyViewed = await multi.ReadAsync<RecentlyViewedDto>();

            return result;
        }

        public async Task LogProductViewAsync(int? userId, int productId)
        {
            await _db.ExecuteAsync("sp_LogProductView", new { UserId = userId, ProductId = productId }, commandType: CommandType.StoredProcedure);
        }

        public async Task<IEnumerable<TrendingDto>> GetTrendingProductsAsync(int days = 14, int limit = 12)
        {
            return await _db.QueryAsync<TrendingDto>("sp_GetTrendingProducts", new { Days = days, Limit = limit }, commandType: CommandType.StoredProcedure);
        }

        public async Task<IEnumerable<RecommendationDto>> GetRecommendationsAsync(int? userId, int limit = 12)
        {
            return await _db.QueryAsync<RecommendationDto>("sp_GetRecommendations", new { UserId = userId, Limit = limit }, commandType: CommandType.StoredProcedure);
        }

        public async Task<IEnumerable<TopCategoryDto>> GetTopCategoriesAsync(int? userId, int limit = 8, int days = 30)
        {
            return await _db.QueryAsync<TopCategoryDto>("sp_GetTopCategories", new { UserId = userId, Limit = limit, Days = days }, commandType: CommandType.StoredProcedure);
        }

        public async Task RecordSearchTermAsync(int? userId, string searchTerm)
        {
            await _db.ExecuteAsync("sp_RecordSearchTerm", new { UserId = userId, SearchTerm = searchTerm }, commandType: CommandType.StoredProcedure);
        }

        public async Task<IEnumerable<TopSearchDto>> GetTopSearchesAsync(int days = 30, int limit = 10)
        {
            return await _db.QueryAsync<TopSearchDto>("sp_GetTopSearches", new { Days = days, Limit = limit }, commandType: CommandType.StoredProcedure);
        }

        public async Task<IEnumerable<BannerDto>> GetActiveBannersAsync()
        {
            return await _db.QueryAsync<BannerDto>("sp_GetActiveBanners", commandType: CommandType.StoredProcedure);
        }


    }
}
