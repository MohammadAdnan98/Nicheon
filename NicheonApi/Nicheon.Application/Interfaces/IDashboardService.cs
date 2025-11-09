using Nicheon.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nicheon.Application.Interfaces
{
    public interface IDashboardService
    {
        Task<DashboardDto> GetDashboardAsync(int businessId);
    }

}
