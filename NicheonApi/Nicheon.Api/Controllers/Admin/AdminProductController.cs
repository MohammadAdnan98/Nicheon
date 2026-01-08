using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nicheon.Application.Interfaces;

namespace Nicheon.Api.Controllers.Admin
{

    [ApiController]
    [Route("api/admin/products")]
    [Authorize]
    public class AdminProductController : ControllerBase
    {
        private readonly IAdminProductRepository _repo;

        public AdminProductController(IAdminProductRepository repo)
        {
            _repo = repo;
        }

        // GET api/admin/products?status=3
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] int? status)
        {
            var data = await _repo.GetProductsAsync(status);
            return Ok(new { success = true, data });
        }

        // POST api/admin/products/{productId}/approve
        [HttpPost("{productId}/approve")]
        public async Task<IActionResult> Approve(int productId, int adminId)
        {
            await _repo.ApproveProductAsync(productId, adminId);
            return Ok(new { success = true });
        }

        // POST api/admin/products/{productId}/reject
        [HttpPost("{productId}/reject")]
        public async Task<IActionResult> Reject(
            int productId,
            int adminId,
            [FromBody] string reason)
        {
            await _repo.RejectProductAsync(productId, adminId, reason);
            return Ok(new { success = true });
        }

        // POST api/admin/products/{productId}/status?statusId=6
        [HttpPost("{productId}/status")]
        public async Task<IActionResult> ChangeStatus(
            int productId,
            int adminId,
            [FromQuery] int statusId)
        {
            await _repo.ToggleProductStatusAsync(productId, statusId, adminId);
            return Ok(new { success = true });
        }
    }



}
