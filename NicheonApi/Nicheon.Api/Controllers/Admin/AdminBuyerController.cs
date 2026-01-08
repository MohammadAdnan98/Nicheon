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

        // GET api/admin/buyers?profileStatus=1
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] int profileStatus)
        {
            var data = await _repo.GetBuyersAsync(profileStatus);
            return Ok(new { success = true, data });
        }

        // POST api/admin/buyers/{userId}/status?accountStatusId=3&adminId=1
        [HttpPost("{userId}/status")]
        public async Task<IActionResult> ChangeStatus(
            int userId,
            [FromQuery] int statusId,
            [FromQuery] int adminId
        )
        {
            await _repo.ToggleBuyerStatusAsync(userId, statusId, adminId);
            return Ok(new { success = true });
        }
    }
}
