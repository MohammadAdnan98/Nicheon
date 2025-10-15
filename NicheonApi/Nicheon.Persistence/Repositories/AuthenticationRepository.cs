using Dapper;
using Microsoft.Data.SqlClient;
using Nicheon.Application.Interfaces;
using Nicheon.Domain.Entities;
using Nicheon.Shared;
using System.Data;
using System.Threading.Tasks;

namespace Nicheon.Persistence.Repositories
{
    public class AuthenticationRepository : IAuthentication
    {
        private readonly IDbConnection _db;
        private readonly IEmailService _emailService;

        public AuthenticationRepository(IDbConnection db, IEmailService emailService)
        {
            _db = db;
            _emailService = emailService;
        }

        public async Task<string> RegisterUserAsync(AuthenticationModel model)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Username", model.Email);
                parameters.Add("@Password", model.Password);
                parameters.Add("@FullName", model.FullName);
                parameters.Add("@Email", model.Email);
                parameters.Add("@Phone", model.Mobile);
                parameters.Add("@Role", model.Role);

                // Seller fields
                parameters.Add("@BusinessName", model.BusinessName);
                parameters.Add("@BusinessType", model.Role == "Seller" ? model.SellerTypeId.ToString() : null);
                parameters.Add("@GSTNumber", model.GSTIN);
                parameters.Add("@Address", model.Address);
                parameters.Add("@Landmark", model.Landmark);
                parameters.Add("@City", model.City);
                parameters.Add("@State", model.State);
                parameters.Add("@Pincode", model.Pincode);

                // Output params
                parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);
                parameters.Add("@OutLoginId", dbType: DbType.Int32, direction: ParameterDirection.Output);
                parameters.Add("@OutOtp", dbType: DbType.String, size: 6, direction: ParameterDirection.Output);

                await _db.ExecuteAsync("sp_RegisterUser", parameters, commandType: CommandType.StoredProcedure);

                int result = parameters.Get<int>("@Result");
                string otp = parameters.Get<string>("@OutOtp");

                if (result == 1)
                {
                    // send OTP via email
                    string subject = "Nicheon - Verify your account";
                    string body = $"Your OTP is: {otp}. It will expire in 10 minutes.";
                    await _emailService.SendEmailAsync(model.Email, subject, body);
                    return "Registration successful. OTP sent to email.";
                }
                else if (result == -1)
                {
                    return "User already exists.";
                }
                return "Registration failed.";
            }
            catch (Exception ex)
            {
                return $"Error: {ex.Message}";
            }
        }

        public async Task<string> VerifyOtpAsync(string email, string otp)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@Username", email);
            parameters.Add("@OtpCode", otp);
            parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);

            await _db.ExecuteAsync("sp_VerifyRegistrationOtp", parameters, commandType: CommandType.StoredProcedure);

            int res = parameters.Get<int>("@Result");
            return res switch
            {
                1 => "OTP Verified",
                -2 => "Invalid or expired OTP",
                _ => "Verification failed"
            };
        }

        public async Task<string> ForgotPasswordAsync(string username)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@Username", username);
            parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);
            parameters.Add("@OutOtp", dbType: DbType.String, size: 6, direction: ParameterDirection.Output);

            await _db.ExecuteAsync("sp_RequestPasswordReset", parameters, commandType: CommandType.StoredProcedure);

            int r = parameters.Get<int>("@Result");
            string otp = parameters.Get<string>("@OutOtp");

            if (r == 1)
            {
                await _emailService.SendEmailAsync(username, "Password Reset OTP", $"Your code: {otp}");
                return "Password reset OTP sent to email.";
            }
            return "Username not found.";
        }

        public async Task<string> ResetPasswordAsync(string username, string password, string otp)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@Username", username);
            parameters.Add("@Password", password);
            parameters.Add("@OtpCode", otp);
            parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);

            await _db.ExecuteAsync("sp_ResetPassword", parameters, commandType: CommandType.StoredProcedure);

            int res = parameters.Get<int>("@Result");
            return res switch
            {
                1 => "Password reset successful",
                -2 => "Invalid OTP",
                _ => "Password reset failed"
            };
        }
    }
}
