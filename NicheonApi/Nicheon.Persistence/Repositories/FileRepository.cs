using Dapper;
using Nicheon.Application.Interfaces;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace Nicheon.Persistence.Repositories
{
    public class FileRepository : IFileRepository
    {
        private readonly IDbConnection _db;

        public FileRepository(IDbConnection db)
        {
            _db = db;
        }

        // ✅ Add a product image
        public async Task<int> AddImageAsync(int productId, int businessId, string imageUrl, string altText, bool isPrimary, int sortOrder)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@ProductId", productId);
            parameters.Add("@BusinessId", businessId);
            parameters.Add("@ImageUrl", imageUrl);
            parameters.Add("@AltText", altText);
            parameters.Add("@IsPrimary", isPrimary);
            parameters.Add("@SortOrder", sortOrder);

            return await _db.ExecuteScalarAsync<int>("proc_InsertProductImage", parameters, commandType: CommandType.StoredProcedure);
        }

        // ✅ Get all images for a product
        public async Task<IEnumerable<dynamic>> GetProductImagesAsync(int productId)
        {
            return await _db.QueryAsync("proc_GetProductImages", new { ProductId = productId }, commandType: CommandType.StoredProcedure);
        }

        // ✅ Delete an image (soft delete)
        public async Task<int> DeleteImageAsync(int imageId)
        {
            return await _db.ExecuteAsync("proc_DeleteProductImage", new { ImageId = imageId }, commandType: CommandType.StoredProcedure);
        }
    }
}
