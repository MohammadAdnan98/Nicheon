using Nicheon.Domain.Entities;
using System.Threading.Tasks;

namespace Nicheon.Application.Interfaces
{
    public interface IAuthentication
    {
        /// <summary>
        /// Register a new user and send OTP to email
        /// </summary>
        Task<string> RegisterUserAsync(AuthenticationModel model);

        /// <summary>
        /// Verify OTP during registration
        /// </summary>
        Task<string> VerifyOtpAsync(string email, string otp);

        /// <summary>
        /// Send password reset OTP to user's email
        /// </summary>
        Task<string> ForgotPasswordAsync(string username);

        /// <summary>
        /// Reset password using OTP
        /// </summary>
        Task<string> ResetPasswordAsync(string username, string password, string otp);
    }
}
