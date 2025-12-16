using Nicheon.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nicheon.Application.Interfaces
{
    public interface IAdminBuyerRepository
    {
        Task<IEnumerable<AdminBuyerDto>> GetBuyersAsync(string? status);
        Task ToggleBuyerStatusAsync(int userId, bool isActive, int adminUserId);
    }
}
