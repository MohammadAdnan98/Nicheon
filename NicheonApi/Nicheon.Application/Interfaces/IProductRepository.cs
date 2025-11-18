using Nicheon.Application.DTOs;
using Nicheon.Domain.Entities;

namespace Nicheon.Application.Interfaces
{
    public interface IProductRepository
    {
        Task<int> CreateAsync(ProductCreateDto dto);
        Task<int> UpdateAsync(ProductCreateDto product);
        Task<int> DeleteAsync(int productId, int businessId);
        Task<Product?> GetByIdAsync(int productId);

        // UPDATED LIST
        Task<PagedResult<ProductListItemDto>> ListAsync(
            int? businessId,
            int? categoryId,
            string? search,
            int page = 1,
            int pageSize = 20,
            int? metalId = null
        );

        Task<int> AddImageAsync(int productId, int businessId, string imageUrl, string? altText, bool isPrimary, int sortOrder);
        Task<int> DeleteImageAsync(int imageId, int businessId);
    }
}
