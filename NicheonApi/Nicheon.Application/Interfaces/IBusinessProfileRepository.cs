using Nicheon.Application.DTOs;
using System.Threading.Tasks;

namespace Nicheon.Application.Interfaces
{
    public interface IBusinessProfileRepository
    {
        Task<BusinessProfileDto?> GetByBusinessIdAsync(int businessId);
        Task<int> UpdateProfileAsync(UpdateBusinessProfileDto dto);
    }
}
