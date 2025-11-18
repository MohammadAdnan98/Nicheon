using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nicheon.Application.DTOs
{
    public class OrderListDto
    {
        public int OrderId { get; set; }
        public string OrderNumber { get; set; }
        public string BuyerName { get; set; }
        public string BuyerCity { get; set; }
        public string Status { get; set; }
        public decimal TotalAmount { get; set; }
        public string PaymentMethod { get; set; }
        public DateTime OrderDate { get; set; }
        public IEnumerable<OrderItemDto> Items { get; set; }
    }

    public class OrderItemDto
    {
        public int OrderItemId { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int Qty { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal? MakingCharges { get; set; }
    }


    public class UpdateOrderStatusDto
    {
        public int OrderId { get; set; }
        public string Status { get; set; }
        public string? Notes { get; set; }
    }
}
