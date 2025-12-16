using Nicheon.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nicheon.Application.Interfaces
{
    public interface IAdminSellerRepository
    {
        Task<IEnumerable<AdminSellerDto>> GetSellersAsync(string? status);
        Task ApproveSellerAsync(int userId, int adminUserId);
        Task ToggleSellerStatusAsync(int userId, bool isActive, int adminUserId);
    }
}
