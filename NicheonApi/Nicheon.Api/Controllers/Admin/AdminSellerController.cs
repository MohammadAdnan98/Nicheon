using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nicheon.Application.Interfaces;

namespace Nicheon.Api.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/sellers")]
    [Authorize]
    public class AdminSellerController : ControllerBase
    {
        private readonly IAdminSellerRepository _repo;

        public AdminSellerController(IAdminSellerRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string? status)
        {
            var data = await _repo.GetSellersAsync(status);
            return Ok(new { success = true, data });
        }

        [HttpPost("{userId}/approve")]
        public async Task<IActionResult> Approve(int userId)
        {
            int adminId = int.Parse(User.FindFirst("sub")!.Value);
            await _repo.ApproveSellerAsync(userId, adminId);
            return Ok(new { success = true, message = "Seller approved." });
        }

        [HttpPost("{userId}/status")]
        public async Task<IActionResult> ToggleStatus(int userId, [FromQuery] bool isActive)
        {
            int adminId = int.Parse(User.FindFirst("sub")!.Value);
            await _repo.ToggleSellerStatusAsync(userId, isActive, adminId);
            return Ok(new { success = true, message = "Seller status updated." });
        }
    }

}
