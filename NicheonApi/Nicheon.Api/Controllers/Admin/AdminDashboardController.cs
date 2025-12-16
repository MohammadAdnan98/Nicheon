using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nicheon.Application.Interfaces;
using Nicheon.Persistence.Repositories;

namespace Nicheon.Api.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/dashboard")]
    [Authorize]
    public class AdminDashboardController : ControllerBase
    {
        private readonly IAdminDashboardRepository _repo;

        public AdminDashboardController(IAdminDashboardRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var data = await _repo.GetDashboardStatsAsync();
            return Ok(new { success = true, data });
        }
    }
}
