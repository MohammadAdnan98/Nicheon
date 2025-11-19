using Microsoft.AspNetCore.Mvc;
using Nicheon.Application.DTOs;
using Nicheon.Application.Interfaces;

namespace Nicheon.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SellerOrdersController : ControllerBase
    {
        private readonly ISellerOrdersRepository _repo;

        public SellerOrdersController(ISellerOrdersRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("GetOrders/{sellerBusinessId:int}")]
        public async Task<IActionResult> GetOrders(int sellerBusinessId)
        {
            var data = await _repo.GetSellerOrdersAsync(sellerBusinessId);
            return Ok(data);
        }

        [HttpPost("UpdateStatus")]
        public async Task<IActionResult> UpdateStatus(UpdateOrderStatusDto dto)
        {
            var result = await _repo.UpdateOrderStatusAsync(dto.OrderId, dto.Status, dto.Notes);
            return result == 1 ? Ok(new { message = "Updated" }) : BadRequest("Failed");
        }

        [HttpGet("GetOrderDetailsById/{orderId:int}")]
        public async Task<IActionResult> GetOrderDetails(int orderId)
        {
            var data = await _repo.GetOrderDetailsAsync(orderId);
            return Ok(data);
        }
    }

    

}
