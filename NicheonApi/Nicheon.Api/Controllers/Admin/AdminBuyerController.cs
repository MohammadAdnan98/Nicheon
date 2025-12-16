using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nicheon.Application.Interfaces;

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
        public async Task<IActionResult> Get([FromQuery] string? status)
        {
            var data = await _repo.GetBuyersAsync(status);
            return Ok(new { success = true, data });
        }

        [HttpPost("{userId}/status")]
        public async Task<IActionResult> ToggleStatus(int userId, [FromQuery] bool isActive)
        {
            int adminId = int.Parse(User.FindFirst("sub")!.Value);
            await _repo.ToggleBuyerStatusAsync(userId, isActive, adminId);
            return Ok(new { success = true, message = "Buyer status updated." });
        }
    }
}
