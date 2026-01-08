using Nicheon.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nicheon.Application.Interfaces
{
    public interface IAdminOrderRepository
    {
        Task<IEnumerable<AdminOrderDto>> GetOrdersAsync(
       string? status, DateTime? fromDate, DateTime? toDate);

        Task<AdminOrderDetailsDto> GetOrderDetailsAsync(int orderId);

        Task UpdateOrderStatusAsync(int orderId, string status, int adminUserId);

        Task UpdateShipmentAsync(
            int orderId, string status, string trackingNumber, int adminUserId);
    }

}
