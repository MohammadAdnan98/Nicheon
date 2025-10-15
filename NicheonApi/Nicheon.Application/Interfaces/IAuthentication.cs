using Nicheon.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Nicheon.Application.Interfaces
{
    public interface IAuthentication
    {
        Task<string> RegisterUserAsync(AuthenticationModel model);
        Task<string> SaveOtp(AuthenticationModel model);

        Task<int> CheckOtp(AuthenticationModel model);
    }
}
