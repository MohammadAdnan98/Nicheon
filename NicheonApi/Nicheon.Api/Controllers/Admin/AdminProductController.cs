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

            [HttpGet]
            public async Task<IActionResult> Get([FromQuery] string? status)
            {
                var data = await _repo.GetProductsAsync(status);
                return Ok(new { success = true, data });
            }

            [HttpPost("{productId}/approve")]
            public async Task<IActionResult> Approve(int productId)
            {
                int adminId = int.Parse(User.FindFirst("sub")!.Value);
                await _repo.ApproveProductAsync(productId, adminId);
                return Ok(new { success = true, message = "Product approved." });
            }

            [HttpPost("{productId}/reject")]
            public async Task<IActionResult> Reject(int productId, [FromBody] string reason)
            {
                int adminId = int.Parse(User.FindFirst("sub")!.Value);
                await _repo.RejectProductAsync(productId, adminId, reason);
                return Ok(new { success = true, message = "Product rejected." });
            }

            [HttpPost("{productId}/status")]
            public async Task<IActionResult> ToggleStatus(int productId, [FromQuery] bool isActive)
            {
                int adminId = int.Parse(User.FindFirst("sub")!.Value);
                await _repo.ToggleProductStatusAsync(productId, isActive, adminId);
                return Ok(new { success = true, message = "Product status updated." });
            }
        }

    
}
