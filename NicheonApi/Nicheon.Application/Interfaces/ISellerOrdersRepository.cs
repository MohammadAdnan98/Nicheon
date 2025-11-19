using Nicheon.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nicheon.Application.Interfaces
{
    public interface ISellerOrdersRepository
    {
        Task<IEnumerable<OrderListDto>> GetSellerOrdersAsync(int sellerBusinessId);
        Task<int> UpdateOrderStatusAsync(int orderId, string status, string? notes);

        Task<OrderDetailsDto> GetOrderDetailsAsync(int orderId);

    }

}
