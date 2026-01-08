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

        // GET api/admin/orders?status=Pending
        [HttpGet]
        public async Task<IActionResult> GetOrders(
            [FromQuery] string? status,
            [FromQuery] DateTime? fromDate,
            [FromQuery] DateTime? toDate)
        {
            // 👇 IMPORTANT: treat "ALL" as null
            if (status == "ALL")
                status = null;

            var orders = await _repo.GetOrdersAsync(status, fromDate, toDate);
            return Ok(new { success = true, data = orders });
        }

        [HttpPost("{orderId}/status")]
        public async Task<IActionResult> UpdateStatus(
        int orderId,
        [FromQuery] string status,
        [FromQuery] int adminId)
        {
            await _repo.UpdateOrderStatusAsync(orderId, status, adminId);
            return Ok(new { success = true });
        }




        [HttpGet("{orderId}")]
            public async Task<IActionResult> GetDetails(int orderId)
            {
                var data = await _repo.GetOrderDetailsAsync(orderId);
                return Ok(new { success = true, data });
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
