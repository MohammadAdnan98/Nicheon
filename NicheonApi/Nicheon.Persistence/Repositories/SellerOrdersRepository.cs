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
    public class SellerOrdersRepository : ISellerOrdersRepository
    {
        private readonly IDbConnection _db;

        public SellerOrdersRepository(IDbConnection db)
        {
            _db = db;
        }

        public async Task<IEnumerable<OrderListDto>> GetSellerOrdersAsync(int sellerBusinessId)
        {
            var result = await _db.QueryAsync(
                "sp_GetSellerOrders",
                new { SellerBusinessId = sellerBusinessId },
                commandType: CommandType.StoredProcedure
            );

            // Parse Items JSON → DTO
            var orders = result.Select(row => new OrderListDto
            {
                OrderId = row.OrderId,
                OrderNumber = row.OrderNumber,
                BuyerName = row.BuyerName,
                BuyerCity = row.BuyerCity,
                Status = row.Status,
                PaymentMethod = row.PaymentMethod,
                TotalAmount = row.TotalAmount,
                OrderDate = row.OrderDate,
                Items = Newtonsoft.Json.JsonConvert.DeserializeObject<List<OrderItemDto>>(row.ItemsJson)
            });

            return orders;
        }

        public async Task<int> UpdateOrderStatusAsync(int orderId, string status, string? notes)
        {
            var p = new DynamicParameters();
            p.Add("@OrderId", orderId);
            p.Add("@Status", status);
            p.Add("@Notes", notes);
            p.Add("@OutResult", dbType: DbType.Int32, direction: ParameterDirection.Output);

            await _db.ExecuteAsync("sp_UpdateOrderStatus", p, commandType: CommandType.StoredProcedure);

            return p.Get<int>("@OutResult");
        }
    }

}
