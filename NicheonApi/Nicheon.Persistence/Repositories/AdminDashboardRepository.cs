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

        public async Task<AdminDashboardDto> GetDashboardStatsAsync()
        {
            return await _db.QueryFirstAsync<AdminDashboardDto>(
                "sp_AdminDashboardStats",
                commandType: CommandType.StoredProcedure);
        }
    }

}
