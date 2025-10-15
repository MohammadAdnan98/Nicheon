using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nicheon.Application.Shared
{
    public interface IOtpService
    {
        Task<int> GenerateAndSendOtpAsync(string mobile);

    }
}
