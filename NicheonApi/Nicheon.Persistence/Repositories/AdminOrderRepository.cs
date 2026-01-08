using Dapper;
using Nicheon.Application.DTOs;
using Nicheon.Application.Interfaces;
using System.Data;

namespace Nicheon.Persistence.Repositories
{
    public class AdminOrderRepository : IAdminOrderRepository
    {
        private readonly IDbConnection _db;

        public AdminOrderRepository(IDbConnection db)
        {
            _db = db;
        }

        public async Task<IEnumerable<AdminOrderDto>> GetOrdersAsync(
     string? status,
     DateTime? fromDate,
     DateTime? toDate)
        {
            return await _db.QueryAsync<AdminOrderDto>(
                "sp_Admin_GetOrders",
                new
                {
                    Status = status,
                    FromDate = fromDate,
                    ToDate = toDate
                },
                commandType: CommandType.StoredProcedure
            );
        }



        public async Task<AdminOrderDetailsDto> GetOrderDetailsAsync(int orderId)
        {
            using var multi = await _db.QueryMultipleAsync(
                "sp_Admin_GetOrderDetails",
                new { OrderId = orderId },
                commandType: CommandType.StoredProcedure);

            var result = new AdminOrderDetailsDto
            {
                Order = await multi.ReadFirstAsync<AdminOrderHeaderDto>(),
                Items = (await multi.ReadAsync<AdminOrderItemDto>()).ToList(),
                Payment = (await multi.ReadAsync<AdminPaymentDto>()).FirstOrDefault(),
                Shipment = (await multi.ReadAsync<AdminShipmentDto>()).FirstOrDefault(),
                Tracking = (await multi.ReadAsync<AdminOrderTrackingDto>()).ToList()
            };

            return result;
        }

        public async Task UpdateOrderStatusAsync(
    int orderId, string status, int adminUserId)
        {
            await _db.ExecuteAsync(
                "sp_Admin_UpdateOrderStatus",
                new { OrderId = orderId, Status = status, AdminUserId = adminUserId },
                commandType: CommandType.StoredProcedure);
        }

        public async Task UpdateShipmentAsync(int orderId, string status, string? trackingNo, int adminUserId)
        {
            await _db.ExecuteAsync(
                "sp_Admin_UpdateShipment",
                new { OrderId = orderId, Status = status, TrackingNumber = trackingNo, AdminUserId = adminUserId },
                commandType: CommandType.StoredProcedure);
        }
    }
}
