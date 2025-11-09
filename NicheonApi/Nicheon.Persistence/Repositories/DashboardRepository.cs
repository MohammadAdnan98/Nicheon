using Dapper;
using Nicheon.Application.DTOs;
using Nicheon.Application.Interfaces;
using System.Data;

namespace Nicheon.Persistence.Repositories
{
    public class DashboardRepository : IDashboardService
    {
        private readonly IDbConnection _db;
        private readonly IEmailService _emailService;
        private readonly IJwtTokenService _jwtTokenService;

        public DashboardRepository(
            IDbConnection db,
            IEmailService emailService,
            IJwtTokenService jwtTokenService)
        {
            _db = db;
            _emailService = emailService;
            _jwtTokenService = jwtTokenService;
        }

        public async Task<DashboardDto> GetDashboardAsync(int businessId)
        {
            var result = new DashboardDto();
            var parameters = new DynamicParameters();
            parameters.Add("@BusinessId", businessId);

            using (var multi = await _db.QueryMultipleAsync("dbo.proc_GetSellerDashboard", parameters, commandType: CommandType.StoredProcedure))
            {
                result.SellerInfo = await multi.ReadFirstOrDefaultAsync<SellerInfoDto>();
                result.Summary = await multi.ReadFirstOrDefaultAsync<OrderSummaryDto>();
                result.RecentOrders = (await multi.ReadAsync<OrderDto>()).ToList();
                result.TopProducts = (await multi.ReadAsync<ProductDto>()).ToList();

                var notif = await multi.ReadFirstOrDefaultAsync<dynamic>();
                result.UnreadNotifications = notif?.UnreadNotifications ?? 0;
            }

            return result;
        }
    }
}
