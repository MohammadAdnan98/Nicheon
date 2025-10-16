using Dapper;
using Nicheon.Application.Interfaces;
using Nicheon.Domain.Entities;
using Nicheon.Shared;
using System;
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

        // -------------------------------------------------------
        //  REGISTER USER
        // -------------------------------------------------------
        public async Task<string> RegisterUserAsync(RegisterModel model)
        {
            try
            {
                var parameters = new DynamicParameters();

                // These EXACTLY match sp_RegisterUser parameters
                parameters.Add("@Username", model.Email);
                parameters.Add("@Password", model.Password);
                parameters.Add("@FullName", model.FullName);
                parameters.Add("@Email", model.Email);
                parameters.Add("@Phone", model.Mobile);
                parameters.Add("@Role", model.Role);
                parameters.Add("@BusinessName", model.BusinessName);
                parameters.Add("@BusinessType", model.BusinessType ?? model.Role);
                parameters.Add("@GSTNumber", model.GSTNumber);
                parameters.Add("@Address", model.Address);
                parameters.Add("@Landmark", model.Landmark);
                parameters.Add("@City", model.City);
                parameters.Add("@State", model.State);
                parameters.Add("@Country", model.Country ?? "India");
                parameters.Add("@Pincode", model.Pincode);

                // OUTPUT
                parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);
                parameters.Add("@OutLoginId", dbType: DbType.Int32, direction: ParameterDirection.Output);
                parameters.Add("@OutOtp", dbType: DbType.String, size: 10, direction: ParameterDirection.Output);

                await _db.ExecuteAsync("sp_RegisterUser", parameters, commandType: CommandType.StoredProcedure);

                int result = parameters.Get<int>("@Result");
                string otp = parameters.Get<string>("@OutOtp");

                if (result == 1)
                {
                    string subject = "Nicheon - Verify Your Account";
                    string body = $"Dear {model.FullName},<br><br>" +
                                  $"Your One-Time Password (OTP) for Nicheon registration is: <b>{otp}</b>.<br>" +
                                  $"It will expire in <b>30 minutes</b>.<br><br>" +
                                  $"Thank you,<br><b>The Nicheon Team</b>";

                    await _emailService.SendEmailAsync(model.Email, subject, body);
                    return "Registration successful. OTP sent to your email.";
                }
                else if (result == -1)
                    return "Username already exists.";
                else if (result == -2)
                    return "Email already registered.";
                else if (result == -3)
                    return "Invalid or incomplete business details.";
                else
                    return "Registration failed. Please try again.";
            }
            catch (Exception ex)
            {
                return $"Error during registration: {ex.Message}";
            }
        }

        // -------------------------------------------------------
        //  VERIFY OTP
        // -------------------------------------------------------
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
                1 => "OTP verified successfully. Account activated.",
                -1 => "User not found.",
                -2 => "Invalid or expired OTP.",
                _ => "Verification failed. Please try again."
            };
        }

        // -------------------------------------------------------
        //  FORGOT PASSWORD
        // -------------------------------------------------------
        public async Task<string> ForgotPasswordAsync(string username)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@Username", username);
            parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);
            parameters.Add("@OutOtp", dbType: DbType.String, size: 10, direction: ParameterDirection.Output);

            await _db.ExecuteAsync("sp_RequestPasswordReset", parameters, commandType: CommandType.StoredProcedure);

            int result = parameters.Get<int>("@Result");
            string otp = parameters.Get<string>("@OutOtp");

            if (result == 1)
            {
                string subject = "Nicheon - Password Reset Request";
                string body = $"Dear user,<br><br>Your OTP for password reset is: <b>{otp}</b>.<br>" +
                              $"It expires in <b>30 minutes</b>.<br><br>" +
                              $"If this wasn’t you, please ignore this message.<br><br>" +
                              $"Thank you,<br><b>Nicheon Team</b>";

                await _emailService.SendEmailAsync(username, subject, body);
                return "Password reset OTP sent to your email.";
            }

            return result == -1 ? "User not found." : "Failed to generate password reset OTP.";
        }

        // -------------------------------------------------------
        //  RESET PASSWORD
        // -------------------------------------------------------
        public async Task<string> ResetPasswordAsync(string username, string newPassword, string otp)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@Username", username);
            parameters.Add("@Password", newPassword);
            parameters.Add("@OtpCode", otp);
            parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);

            await _db.ExecuteAsync("sp_ResetPassword", parameters, commandType: CommandType.StoredProcedure);
            int res = parameters.Get<int>("@Result");

            return res switch
            {
                1 => "Password reset successful.",
                -1 => "User not found.",
                -2 => "Invalid or expired OTP.",
                _ => "Password reset failed."
            };
        }


        // -------------------------------------------------------
        // Login
        // -------------------------------------------------------


        public async Task<(string message, LoginResponseModel? data)> LoginAsync(LoginModel model)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Username", model.Username);
                parameters.Add("@Password", model.Password);
                parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);

                var resultSet = await _db.QueryAsync<LoginResponseModel>(
                    "sp_LoginUser",
                    parameters,
                    commandType: CommandType.StoredProcedure
                );

                int result = parameters.Get<int>("@Result");

                if (result == -1)
                    return ("Invalid username or password.", null);
                else if (result == -2)
                    return ("Your account is not verified yet. Please verify your OTP.", null);
                else if (result == 1)
                {
                    var user = resultSet.FirstOrDefault();
                    return ("Login successful.", user);
                }

                return ("Login failed. Please try again.", null);
            }
            catch (Exception ex)
            {
                return ($"Error during login: {ex.Message}", null);
            }
        }
    }
}
