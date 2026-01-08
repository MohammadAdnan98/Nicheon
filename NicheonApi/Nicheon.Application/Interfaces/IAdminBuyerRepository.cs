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
        Task<IEnumerable<AdminBuyerDto>> GetBuyersAsync(int profileStatusId);
        Task ToggleBuyerStatusAsync(int userId, int statusId, int adminUserId);
    }
}
