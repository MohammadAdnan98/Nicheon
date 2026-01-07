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
        Task<IEnumerable<AdminSellerDto>> GetSellersAsync(int? status);
        Task ApproveSellerAsync(int userId, int adminUserId);
        Task ToggleSellerStatusAsync(int userId, int StatusId, int adminUserId);
    }
}
