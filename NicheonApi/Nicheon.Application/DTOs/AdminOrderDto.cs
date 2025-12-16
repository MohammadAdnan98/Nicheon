using System;
using System.Collections.Generic;

namespace Nicheon.Application.DTOs
{
    public class AdminOrderDto
    {
        public int OrderId { get; set; }
        public string OrderNumber { get; set; } = "";
        public DateTime OrderDate { get; set; }
        public string Status { get; set; } = "";
        public decimal TotalAmount { get; set; }
        public string BuyerName { get; set; } = "";
        public string SellerName { get; set; } = "";
    }

    public class AdminOrderDetailsDto
    {
        public AdminOrderHeaderDto Order { get; set; } = new();
        public List<AdminOrderItemDto> Items { get; set; } = new();
        public AdminPaymentDto? Payment { get; set; }
        public AdminShipmentDto? Shipment { get; set; }
        public List<AdminOrderTrackingDto> Tracking { get; set; } = new();
    }

    public class AdminOrderHeaderDto
    {
        public int OrderId { get; set; }
        public string OrderNumber { get; set; } = "";
        public DateTime OrderDate { get; set; }
        public string Status { get; set; } = "";
        public decimal TotalAmount { get; set; }
        public string BuyerName { get; set; } = "";
        public string SellerName { get; set; } = "";
    }

    public class AdminOrderItemDto
    {
        public string ProductName { get; set; } = "";
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal? MakingCharges { get; set; }
        public decimal LineTotal { get; set; }
    }

    public class AdminPaymentDto
    {
        public string PaymentMethod { get; set; } = "";
        public decimal Amount { get; set; }
        public string PaymentStatus { get; set; } = "";
        public DateTime? CollectedOn { get; set; }
    }

    public class AdminShipmentDto
    {
        public string Status { get; set; } = "";
        public string? TrackingNumber { get; set; }
        public DateTime? ShippedOn { get; set; }
        public DateTime? DeliveredOn { get; set; }
    }

    public class AdminOrderTrackingDto
    {
        public string Status { get; set; } = "";
        public string? Message { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
