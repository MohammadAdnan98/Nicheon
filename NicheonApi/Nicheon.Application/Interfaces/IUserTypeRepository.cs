using Nicheon.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nicheon.Application.Interfaces
{
    public interface IUserTypeRepository
    {
        Task<IEnumerable<UserType>> GetAllAsync();
        Task<UserType?> GetByIdAsync(int id);
        Task<int> AddAsync(UserType userType);
        Task<bool> UpdateAsync(UserType userType);
        Task<bool> DeleteAsync(int id);
    }
}
