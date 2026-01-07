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

        // GET api/admin/sellers?status=2
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] int status)
        {
            var data = await _repo.GetSellersAsync(status);
            return Ok(new { success = true, data });
        }

        // POST api/admin/sellers/{userId}/approve?adminId=1
        [HttpPost("{userId}/approve")]
        public async Task<IActionResult> Approve(
            int userId,
            [FromQuery] int adminId
        )
        {
            await _repo.ApproveSellerAsync(userId, adminId);
            return Ok(new { success = true });
        }

        // POST api/admin/sellers/{userId}/status?statusId=3&adminId=1
        [HttpPost("{userId}/status")]
        public async Task<IActionResult> ChangeStatus(
            int userId,
            [FromQuery] int statusId,
            [FromQuery] int adminId
        )
        {
            await _repo.ToggleSellerStatusAsync(userId, statusId, adminId);
            return Ok(new { success = true });
        }
    }
}
