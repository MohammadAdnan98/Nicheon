using Dapper;
using Nicheon.Application.Interfaces;
using System.Collections.Generic;
using System.Data;
using System.Linq;
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

        //public async Task<(int Result, int ImageId)> AddImageAsync(int productId, int businessId, string imageUrl, string altText, bool isPrimary, int sortOrder)
        //{
        //    var p = new DynamicParameters();
        //    p.Add("@ProductId", productId);
        //    p.Add("@BusinessId", businessId);
        //    p.Add("@ImageUrl", imageUrl);
        //    p.Add("@AltText", altText);
        //    p.Add("@IsPrimary", isPrimary);
        //    p.Add("@SortOrder", sortOrder);
        //    p.Add("@OutResult", dbType: DbType.Int32, direction: ParameterDirection.Output);
        //    p.Add("@OutImageId", dbType: DbType.Int32, direction: ParameterDirection.Output);

        //    await _db.ExecuteAsync("dbo.sp_AddProductImage", p, commandType: CommandType.StoredProcedure);

        //    int result = p.Get<int>("@OutResult");
        //    int imageId = p.Get<int>("@OutImageId");
        //    return (result, imageId);
        //}   


        public async Task<(int Result, int ImageId)> AddImageAsync(int productId, int businessId, string imageUrl, string altText, bool isPrimary, int sortOrder)
        {
            var p = new DynamicParameters();
            p.Add("@ProductId", productId);
            p.Add("@BusinessId", businessId);
            p.Add("@ImageUrl", imageUrl);
            p.Add("@AltText", altText);
            p.Add("@IsPrimary", isPrimary);
            p.Add("@SortOrder", sortOrder);
            p.Add("@OutResult", dbType: DbType.Int32, direction: ParameterDirection.Output);
            p.Add("@OutImageId", dbType: DbType.Int32, direction: ParameterDirection.Output);

            await _db.ExecuteAsync("sp_AddProductImage", p, commandType: CommandType.StoredProcedure);

            return (p.Get<int>("@OutResult"), p.Get<int>("@OutImageId"));
        }


        public async Task<IEnumerable<dynamic>> GetProductImagesAsync(int productId)
        {
            var list = await _db.QueryAsync("dbo.sp_GetProductImages", new { ProductId = productId }, commandType: CommandType.StoredProcedure);
            return list;
        }

        //public async Task<int> DeleteImageAsync(int imageId)
        //{
        //    var p = new DynamicParameters();
        //    p.Add("@ImageId", imageId);
        //    p.Add("@OutResult", dbType: DbType.Int32, direction: ParameterDirection.Output);
        //    await _db.ExecuteAsync("dbo.sp_DeleteProductImage", p, commandType: CommandType.StoredProcedure);
        //    return p.Get<int>("@OutResult");
        //}


        public async Task<int> DeleteImageAsync(int imageId)
        {
            var p = new DynamicParameters();
            p.Add("@ImageId", imageId);
            p.Add("@OutResult", dbType: DbType.Int32, direction: ParameterDirection.Output);

            await _db.ExecuteAsync("sp_DeleteProductImage", p, commandType: CommandType.StoredProcedure);
            return p.Get<int>("@OutResult");
        }
    }
}
