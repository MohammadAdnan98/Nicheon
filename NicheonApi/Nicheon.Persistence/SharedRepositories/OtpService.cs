using System;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using Nicheon.Application.Shared;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

public class OtpService : IOtpService
{
    private readonly IDbConnection _db;
    private readonly string _twilioSid;
    private readonly string _twilioToken;
    private readonly string _twilioFrom;

    public OtpService(IDbConnection db, IConfiguration config)
    {
        _db = db;

        _twilioSid = config["Twilio:AccountSid"];
        _twilioToken = config["Twilio:AuthToken"];
        _twilioFrom = config["Twilio:From"];

        if (string.IsNullOrWhiteSpace(_twilioSid))
            throw new Exception("Twilio AccountSid is missing in configuration.");

        if (string.IsNullOrWhiteSpace(_twilioToken))
            throw new Exception("Twilio AuthToken is missing in configuration.");

        if (string.IsNullOrWhiteSpace(_twilioFrom))
            throw new Exception("Twilio From Number is missing in configuration.");

        TwilioClient.Init(_twilioSid, _twilioToken);
    }

    public async Task<int> GenerateAndSendOtpAsync(string mobile)
    {
        var rng = new Random();
        var otp = rng.Next(100000, 999999).ToString();

        //var message = await MessageResource.CreateAsync(
        //    body: $"Welcome to Nicheon! Your OTP for registration is: {otp}. Do not share it with anyone.",
        //    from: new PhoneNumber(_twilioFrom),
        //    to: new PhoneNumber(mobile)
        //);

        var parameters = new DynamicParameters();
        parameters.Add("@MobileNumber", mobile);
        parameters.Add("@OTP", otp);
        parameters.Add("@ExpiresAt", DateTime.UtcNow.AddMinutes(10));

       int result= await _db.ExecuteAsync("sp_SaveOtp", parameters, commandType: CommandType.StoredProcedure);
        
       return result;



    }
}
