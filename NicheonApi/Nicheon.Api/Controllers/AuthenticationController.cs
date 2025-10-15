using Microsoft.AspNetCore.Mvc;
using Nicheon.Application.Interfaces;
using Nicheon.Domain.Entities;
using System.Threading.Tasks;

namespace Nicheon.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthentication _authService;

        public AuthController(IAuthentication authService)
        {
            _authService = authService;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] AuthenticationModel model)
        {
            var result = await _authService.RegisterUserAsync(model);
            return Ok(new { message = result });
        }

        [HttpPost("VerifyOtp")]
        public async Task<IActionResult> VerifyOtp([FromQuery] string email, [FromQuery] string otp)
        {
            var result = await _authService.VerifyOtpAsync(email, otp);
            return Ok(new { message = result });
        }

        [HttpPost("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromQuery] string username)
        {
            var result = await _authService.ForgotPasswordAsync(username);
            return Ok(new { message = result });
        }

        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromQuery] string username, [FromQuery] string otp, [FromQuery] string password)
        {
            var result = await _authService.ResetPasswordAsync(username, password, otp);
            return Ok(new { message = result });
        }
    }
}
