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

            // GROUP BY ORDER
            var orders = result
                .GroupBy(row => new
                {
                    row.OrderId,
                    row.OrderNumber,
                    row.BuyerName,
                    row.BuyerCity,
                    row.Status,
                    row.PaymentMethod,
                    row.TotalAmount,
                    row.OrderDate
                })
                .Select(g => new OrderListDto
                {
                    OrderId = g.Key.OrderId,
                    OrderNumber = g.Key.OrderNumber,
                    BuyerName = g.Key.BuyerName,
                    BuyerCity = g.Key.BuyerCity,
                    Status = g.Key.Status,
                    PaymentMethod = g.Key.PaymentMethod,
                    TotalAmount = g.Key.TotalAmount,
                    OrderDate = g.Key.OrderDate,

                    Items = g.Select(x => new OrderItemDto
                    {
                        OrderItemId = x.OrderItemId,
                        ProductId = x.ProductId,
                        ProductName = x.ProductName,
                        Qty = x.Qty,
                        UnitPrice = x.UnitPrice,
                        MakingCharges = x.MakingCharges
                    }).ToList()
                })
                .ToList();

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

        public async Task<OrderDetailsDto> GetOrderDetailsAsync(int orderId)
        {
            using (var multi = await _db.QueryMultipleAsync(
                "sp_GetOrderDetails",
                new { OrderId = orderId },
                commandType: CommandType.StoredProcedure))
            {
                var header = await multi.ReadFirstOrDefaultAsync<OrderDetailsDto>();
                var items = await multi.ReadAsync<OrderProductDto>();
                var images = await multi.ReadAsync<dynamic>();

                // ⭐ FIXED — force dictionary value type to List<string>
                var imgLookup = images
                    .GroupBy(i => (int)i.ProductId)
                    .ToDictionary(
                        g => g.Key,
                        g => g.Select(x => $"{x.ImageUrl}").ToList()
                    );

                foreach (var item in items)
                {
                    item.Images = imgLookup.ContainsKey(item.ProductId)
                        ? imgLookup[item.ProductId]
                        : new List<string>();
                }

                header.Items = items.ToList();
                return header;

            }
        }
    }

}
