using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nicheon.Application.Interfaces;

namespace Nicheon.Api.Controllers.Admin
{
        [ApiController]
        [Route("api/admin/orders")]
        [Authorize]
        public class AdminOrderController : ControllerBase
        {
            private readonly IAdminOrderRepository _repo;

            public AdminOrderController(IAdminOrderRepository repo)
            {
                _repo = repo;
            }

            [HttpGet]
            public async Task<IActionResult> Get(
                [FromQuery] string? status,
                [FromQuery] DateTime? from,
                [FromQuery] DateTime? to)
            {
                var data = await _repo.GetOrdersAsync(status, from, to);
                return Ok(new { success = true, data });
            }

            [HttpGet("{orderId}")]
            public async Task<IActionResult> GetDetails(int orderId)
            {
                var data = await _repo.GetOrderDetailsAsync(orderId);
                return Ok(new { success = true, data });
            }

            [HttpPost("{orderId}/status")]
            public async Task<IActionResult> UpdateStatus(int orderId, int adminId, [FromQuery] string status)
            {
                
                await _repo.UpdateOrderStatusAsync(orderId, status, adminId);
                return Ok(new { success = true, message = "Order status updated." });
            }

            [HttpPost("{orderId}/shipment")]
            public async Task<IActionResult> UpdateShipment(
                int orderId,
                int adminId,
                [FromQuery] string status,
                [FromQuery] string? trackingNo)
            {
     
                await _repo.UpdateShipmentAsync(orderId, status, trackingNo, adminId);
                return Ok(new { success = true, message = "Shipment updated." });
            }
        }
}
