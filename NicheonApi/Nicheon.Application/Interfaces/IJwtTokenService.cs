using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nicheon.Application.Interfaces
{
    public interface IJwtTokenService
    {
        string GenerateToken(string userId, string fullName, string email, string role);

    }
}
