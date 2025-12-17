using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nicheon.Application.Interfaces;
using System.Security.Claims;

namespace Nicheon.Api.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/buyers")]
    [Authorize]
    public class AdminBuyerController : ControllerBase
    {
        private readonly IAdminBuyerRepository _repo;

        public AdminBuyerController(IAdminBuyerRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get(
           [FromQuery] int? accountStatus,
           [FromQuery] int? profileStatus)
        {
            var data = await _repo.GetBuyersAsync(accountStatus, profileStatus);
            return Ok(new { success = true, data });
        }

        [HttpPost("{userId}/status")]
        public async Task<IActionResult> ToggleStatus(
            int userId,
            [FromQuery] int accountStatusId)
        {
            int adminUserId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            await _repo.ToggleBuyerStatusAsync(userId, accountStatusId, adminUserId);
            return Ok(new { success = true, message = "Buyer status updated." });
        }
    }
}
