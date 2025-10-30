using Nicheon.Domain.Entities;
using Nicheon.Application.DTOs;

namespace Nicheon.Application.Interfaces
{
    public interface IProductRepository
    {
        Task<int> CreateAsync(ProductCreateDto dto);
        Task<int> UpdateAsync(Product product);
        Task<int> DeleteAsync(int productId, int businessId);
        Task<Product?> GetByIdAsync(int productId);
        Task<IEnumerable<Product>> ListAsync(int? businessId, int? categoryId, string? search, int page = 1, int pageSize = 20);
        Task<int> AddImageAsync(int productId, int businessId, string imageUrl, string? altText, bool isPrimary, int sortOrder);
        Task<int> DeleteImageAsync(int imageId, int businessId);
    }
}
