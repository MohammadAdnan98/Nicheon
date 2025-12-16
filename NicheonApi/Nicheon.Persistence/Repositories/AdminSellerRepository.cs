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
    public class AdminSellerRepository : IAdminSellerRepository
    {
        private readonly IDbConnection _db;

        public AdminSellerRepository(IDbConnection db)
        {
            _db = db;
        }

        public async Task<IEnumerable<AdminSellerDto>> GetSellersAsync(string? status)
        {
            return await _db.QueryAsync<AdminSellerDto>(
                "sp_Admin_GetSellers",
                new { Status = status },
                commandType: CommandType.StoredProcedure);
        }

        public async Task ApproveSellerAsync(int userId, int adminUserId)
        {
            await _db.ExecuteAsync(
                "sp_Admin_ApproveSeller",
                new { UserId = userId, AdminUserId = adminUserId },
                commandType: CommandType.StoredProcedure);
        }

        public async Task ToggleSellerStatusAsync(int userId, bool isActive, int adminUserId)
        {
            await _db.ExecuteAsync(
                "sp_Admin_ToggleSellerStatus",
                new { UserId = userId, IsActive = isActive, AdminUserId = adminUserId },
                commandType: CommandType.StoredProcedure);
        }
    }

}
