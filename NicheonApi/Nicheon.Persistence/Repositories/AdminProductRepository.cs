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
    public class AdminProductRepository : IAdminProductRepository
    {
        private readonly IDbConnection _db;

        public AdminProductRepository(IDbConnection db)
        {
            _db = db;
        }

        public async Task<IEnumerable<AdminProductDto>> GetProductsAsync(string? status)
        {
            return await _db.QueryAsync<AdminProductDto>(
                "sp_Admin_GetProducts",
                new { Status = status },
                commandType: CommandType.StoredProcedure);
        }

        public async Task ApproveProductAsync(int productId, int adminUserId)
        {
            await _db.ExecuteAsync(
                "sp_Admin_ApproveProduct",
                new { ProductId = productId, AdminUserId = adminUserId },
                commandType: CommandType.StoredProcedure);
        }

        public async Task RejectProductAsync(int productId, int adminUserId, string reason)
        {
            await _db.ExecuteAsync(
                "sp_Admin_RejectProduct",
                new { ProductId = productId, AdminUserId = adminUserId, Reason = reason },
                commandType: CommandType.StoredProcedure);
        }

        public async Task ToggleProductStatusAsync(int productId, int statusId, int adminUserId)
        {
            await _db.ExecuteAsync(
                "sp_Admin_ToggleProductStatus",
                new
                {
                    ProductId = productId,
                    StatusId = statusId,
                    AdminUserId = adminUserId
                },
                commandType: CommandType.StoredProcedure);
        }

    }

}
