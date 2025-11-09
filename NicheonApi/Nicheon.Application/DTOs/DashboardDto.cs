using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nicheon.Application.DTOs
{


    // Models/DashboardDto.cs
    public class DashboardDto
    {
        public SellerInfoDto SellerInfo { get; set; }
        public OrderSummaryDto Summary { get; set; }
        public List<OrderDto> RecentOrders { get; set; }
        public List<ProductDto> TopProducts { get; set; }
        public int UnreadNotifications { get; set; }
    }

    public class SellerInfoDto
    {
        public int BusinessId { get; set; }
        public string BusinessName { get; set; }
        public string BusinessType { get; set; }
        public string GSTNumber { get; set; }
        public string ContactPerson { get; set; }
        public string ContactPhone { get; set; }
        public string BusinessEmail { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Pincode { get; set; }
        public bool IsVerified { get; set; }
    }

    public class OrderSummaryDto
    {
        public int NewOrders { get; set; }
        public int AcceptedOrders { get; set; }
        public int ShippedOrders { get; set; }
        public decimal Revenue { get; set; }
    }

    public class OrderDto
    {
        public int OrderId { get; set; }
        public string OrderNumber { get; set; }
        public int BuyerBusinessId { get; set; }
        public string BuyerName { get; set; }
        public decimal TotalAmount { get; set; }
        public string Status { get; set; }
        public DateTime OrderDate { get; set; }
        public string ItemsSummary { get; set; }
    }

    public class ProductDto
    {
        public int ProductId { get; set; }
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public decimal? PricePerGram { get; set; }
        public decimal? MakingCharges { get; set; }
        public int Stock { get; set; }
        public string PrimaryImage { get; set; }
    }

}
