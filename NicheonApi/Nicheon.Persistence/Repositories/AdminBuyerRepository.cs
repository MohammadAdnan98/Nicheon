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

        public async Task<IEnumerable<AdminBuyerDto>> GetBuyersAsync(int profileStatusId)
        {
            return await _db.QueryAsync<AdminBuyerDto>(
                "sp_Admin_GetBuyers",
                new { ProfileStatus = profileStatusId },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task ToggleBuyerStatusAsync(int userId, int statusId, int adminUserId)
        {
            await _db.ExecuteAsync(
                "sp_Admin_ToggleBuyerStatus",
                new
                {
                    UserId = userId,
                    AccountStatusId = statusId,
                    AdminUserId = adminUserId
                },
                commandType: CommandType.StoredProcedure
            );
        }
    }
}
