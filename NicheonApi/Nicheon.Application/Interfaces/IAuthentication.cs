using System.Threading.Tasks;
using Nicheon.Domain.Entities;

namespace Nicheon.Application.Interfaces
{
    public interface IAuthentication
    {
        Task<string> RegisterUserAsync(RegisterModel model);
        Task<string> VerifyOtpAsync(string email, string otp);
        Task<string> ForgotPasswordAsync(string username);
        Task<string> ResetPasswordAsync(string username, string newPassword, string otp);

        Task<(string message, LoginResponseModel? data)> LoginAsync(LoginModel model);

    }
}
