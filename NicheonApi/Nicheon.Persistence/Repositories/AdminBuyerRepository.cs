using Dapper;
using Nicheon.Application.DTOs;
using Nicheon.Application.Interfaces;
using System.Data;

namespace Nicheon.Persistence.Repositories
{
    public class AdminBuyerRepository : IAdminBuyerRepository
    {
        private readonly IDbConnection _db;

        public AdminBuyerRepository(IDbConnection db)
        {
            _db = db;
        }

        public async Task<IEnumerable<AdminBuyerDto>> GetBuyersAsync(string? status)
        {
            return await _db.QueryAsync<AdminBuyerDto>(
                "sp_Admin_GetBuyers",
                new { Status = status },
                commandType: CommandType.StoredProcedure);
        }

        public async Task ToggleBuyerStatusAsync(int userId, bool isActive, int adminUserId)
        {
            await _db.ExecuteAsync(
                "sp_Admin_ToggleBuyerStatus",
                new { UserId = userId, IsActive = isActive, AdminUserId = adminUserId },
                commandType: CommandType.StoredProcedure);
        }
    }
}
