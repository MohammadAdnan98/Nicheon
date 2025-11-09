using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nicheon.Application.Interfaces;

namespace Nicheon.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class DashboardController : Controller
    {
        private readonly IDashboardService _dashboardService;

        public DashboardController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        // GET api/dashboard/{businessId}
        [HttpGet("{businessId:int}")]
        public async Task<IActionResult> GetDashboard(int businessId)
        {
            if (businessId <= 0) return BadRequest("Invalid BusinessId");

            var dto = await _dashboardService.GetDashboardAsync(businessId);
            return Ok(dto);
        }
    }
}
