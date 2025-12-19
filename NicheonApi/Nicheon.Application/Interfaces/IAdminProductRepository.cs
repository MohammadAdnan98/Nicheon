using Nicheon.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nicheon.Application.Interfaces
{
    public interface IAdminProductRepository
    {
        Task<IEnumerable<AdminProductDto>> GetProductsAsync(string? status);
        Task ApproveProductAsync(int productId, int adminUserId);
        Task RejectProductAsync(int productId, int adminUserId, string reason);
        Task ToggleProductStatusAsync(int productId, int statusId, int adminUserId);
    }

}
