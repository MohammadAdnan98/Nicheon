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
    public class AdminDashboardRepository : IAdminDashboardRepository
    {
        private readonly IDbConnection _db;

        public AdminDashboardRepository(IDbConnection db)
        {
            _db = db;
        }

        public async Task<AdminDashboardResponseDto> GetDashboardStatsAsync()
        {
            using var multi = await _db.QueryMultipleAsync(
                "sp_AdminDashboardStats",
                commandType: CommandType.StoredProcedure
            );

            var stats = await multi.ReadSingleAsync<AdminDashboardDto>();
            var recentOrders = (await multi.ReadAsync<AdminRecentOrderDto>()).ToList();

            return new AdminDashboardResponseDto
            {
                Stats = stats,
                RecentOrders = recentOrders
            };
        }
    }

}
