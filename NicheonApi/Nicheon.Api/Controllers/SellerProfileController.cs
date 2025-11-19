using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nicheon.Application.DTOs;
using Nicheon.Application.Interfaces;
using System.Threading.Tasks;

namespace Nicheon.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class SellerProfileController : ControllerBase
    {
        private readonly IBusinessProfileRepository _repo;

        public SellerProfileController(IBusinessProfileRepository repo)
        {
            _repo = repo;
        }

        // GET api/SellerProfile/GetByBusinessId/2
        [HttpGet("GetByBusinessId/{businessId:int}")]
        [AllowAnonymous] // optional: allow anonymous if profile is public
        public async Task<IActionResult> GetByBusinessId(int businessId)
        {
            var data = await _repo.GetByBusinessIdAsync(businessId);
            if (data == null) return NotFound();
            return Ok(data);
        }

        // POST api/SellerProfile/UpdateProfile
        [HttpPost("UpdateProfile")]
        public async Task<IActionResult> UpdateProfile(UpdateBusinessProfileDto dto)
        {
            var result = await _repo.UpdateProfileAsync(dto);
            if (result == 1) return Ok(new { message = "Updated" });
            return BadRequest(new { message = "Update failed" });
        }
    }
}
