using Dapper;
using Microsoft.Data.SqlClient;
using Nicheon.Application.Interfaces;
using Nicheon.Domain.Entities;
using System.Data;
using BCrypt.Net;



namespace Nicheon.Persistence.Repositories
{
    public class AuthenticationRepository : IAuthentication
    {
        private readonly IDbConnection _db;

        public AuthenticationRepository(IDbConnection db)
        {
            _db = db;
        }

        public async Task<string> RegisterUserAsync(AuthenticationModel model)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@FullName", model.FullName);
                parameters.Add("@MobileNumber", model.Mobile);
                parameters.Add("@Email", model.Email);
                parameters.Add("@PasswordHash", BCrypt.Net.BCrypt.HashPassword(model.Password));
                parameters.Add("@Role", model.Role);
                parameters.Add("@PANNo", model.PANNo);

                if (model.Role == "Seller")
                {
                    parameters.Add("@SellerTypeId", model.SellerTypeId);
                    parameters.Add("@GSTNo", model.GSTIN);
                    parameters.Add("@ShopOrCompanyName", model.BusinessName);
                    parameters.Add("@ShopNo", model.ShopNo);
                    parameters.Add("@BuildingName", model.BuildingName);
                    parameters.Add("@Landmark", model.Landmark);
                    parameters.Add("@AddressLine", model.Address);
                    parameters.Add("@City", model.City);
                    parameters.Add("@State", model.State);
                    parameters.Add("@Pincode", model.Pincode);
                }
                else if (model.Role == "Buyer")
                {
                    parameters.Add("@BusinessExperienceYears", model.Exprience);
                    parameters.Add("@MaxPurchaseCapacity", model.Capacity);
                }

                int result = await _db.ExecuteAsync("sp_RegisterUser", parameters, commandType: CommandType.StoredProcedure);

                if (result == -1)
                {
                    return "User already exists.";
                }
                else if (result == 1)
                {
                    return "User registered successfully.";
                }
                else
                {
                    return "Registration failed. Please try again.";
                }
            }
            catch (Exception ex)
            {
                // Log the exception if needed
                return $"Error occurred: {ex.Message}";
            }
        }

        public async Task<string> SaveOtp(AuthenticationModel model)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@MobileNumber", model.Mobile);
                parameters.Add("@OTP", model.otp); // Assuming OTP is passed as Password for simplicity
                parameters.Add("@ExpiresAt", DateTime.UtcNow.AddMinutes(10));
                await _db.ExecuteAsync("sp_SaveOtp", parameters, commandType: CommandType.StoredProcedure);
                return "OTP saved successfully.";
            }
            catch (Exception ex)
            {
                // Log the exception if needed
                return $"Error occurred while saving OTP: {ex.Message}";
            }
        }

        public async Task<int> CheckOtp(AuthenticationModel model)
        {
            try
            {
                int result = 0;
                var parameters = new DynamicParameters();
                parameters.Add("@UserId", model.Mobile);
                parameters.Add("@OTP", model.otp); // Assuming OTP is passed as Password for simplicity
                result = await _db.ExecuteAsync("sp_CheckOtp", parameters, commandType: CommandType.StoredProcedure);
                return result;


            }
            catch (Exception ex)
            {
                // Log the exception if needed
                return -1;
            }
        }

    }
}
