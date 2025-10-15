using Microsoft.AspNetCore.Mvc;
using Nicheon.Application.Interfaces;
using Nicheon.Application.Shared;
using Nicheon.Domain.Entities;
using System.Threading.Tasks;
using static System.Net.WebRequestMethods;

namespace Nicheon.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthentication _authService;
        private readonly IOtpService _otpService;

        public AuthController(IAuthentication authService, IOtpService otpService)
        {
            _authService = authService;
            _otpService = otpService;
        }

        [HttpPost("UserRegistration")]
        public async Task<IActionResult> RegisterUser([FromBody] AuthenticationModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _authService.RegisterUserAsync(model);
            if (result == "User registered successfully.")
            {
                int otpresult = await _otpService.GenerateAndSendOtpAsync(model.Mobile);

                //var otpresult = await _authService.SaveOtp(model);

                if (otpresult > 0)
                {
                    return Ok(new { message = result});
                }
            }

            return Ok(new { message = result });
        }

        [HttpPost("ResendOtp")]
        public async Task<IActionResult> ResendOtp([FromBody] AuthenticationModel model)
        {
            var otpresult = await _otpService.GenerateAndSendOtpAsync(model.Mobile);

            //var otpresult = await _authService.SaveOtp(model);

            if (otpresult > 0)
            {
                return Ok(new {  otp = "otp resend sucessfully" });
            }

            return Ok(new { otp = "opt not sent" });
        }

        [HttpPost("CheckOtp")]
        public async Task<int> CheckOtp([FromBody] AuthenticationModel model)
        {
            int  otpresult = await _authService.CheckOtp(model);

            return otpresult;



        }

    }


}
