using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nicheon.Application.DTOs
{
    public class AdminDashboardDto
    {
        public int TotalSellers { get; set; }
        public int PendingSellers { get; set; }
        public int TotalBuyers { get; set; }
        public int PendingProducts { get; set; }
        public int TotalOrders { get; set; }
        public int OrdersToday { get; set; }
        public decimal RevenueToday { get; set; }
    }

    public class AdminRecentOrderDto
    {
        public int OrderId { get; set; }
        public string OrderNumber { get; set; } = "";
        public DateTime OrderDate { get; set; }
        public string Status { get; set; } = "";
        public decimal TotalAmount { get; set; }
        public string BuyerName { get; set; } = "";
        public string SellerName { get; set; } = "";
    }

    public class AdminDashboardResponseDto
    {
        public AdminDashboardDto Stats { get; set; } = new();
        public IEnumerable<AdminRecentOrderDto> RecentOrders { get; set; }
            = new List<AdminRecentOrderDto>();
    }

   
}
