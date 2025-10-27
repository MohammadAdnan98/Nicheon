using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nicheon.Application.Interfaces;
using Nicheon.Domain.Entities;
using System.Threading.Tasks;

namespace Nicheon.Api.Controllers
{
    [AllowAnonymous]  // ✅ This controller does not require token unless we specify
    [ApiController]
    [Route("api/[controller]")]

    public class AuthController : ControllerBase
    {
        private readonly IAuthentication _authService;

        public AuthController(IAuthentication authService)
        {
            _authService = authService;
        }

        // ---------------- Register ----------------
        [AllowAnonymous]
        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _authService.RegisterUserAsync(model);
            return Ok(new { message = result });
        }

        // ---------------- Verify OTP ----------------
        [AllowAnonymous]
        [HttpPost("VerifyOtp")]
        public async Task<IActionResult> VerifyOtp([FromBody] VerifyOtpModel model)
        {
            var result = await _authService.VerifyOtpAsync(model.Email, model.Otp);
            return Ok(new { message = result });
        }

        // ---------------- Forgot Password ----------------
        [AllowAnonymous]
        [HttpPost("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordModel model)
        {
            var result = await _authService.ForgotPasswordAsync(model.Email);
            return Ok(new { message = result });
        }

        // ---------------- Reset Password ----------------
        [AllowAnonymous]
        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordModel model)
        {
            var result = await _authService.ResetPasswordAsync(model.Email, model.NewPassword, model.Otp);
            return Ok(new { message = result });
        }

        // ---------------- Login ----------------
        [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var (message, data) = await _authService.LoginAsync(model);

            if (data != null)
                return Ok(new { message, user = data });

            return Unauthorized(new { message });
        }

    }
}
