using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nicheon.Application.DTOs;
using Nicheon.Application.Interfaces;
using Nicheon.Domain.Entities;

namespace Nicheon.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _repository;

        public ProductController(IProductRepository repository)
        {
            _repository = repository;
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] ProductCreateDto dto)
        {
            var id = await _repository.CreateAsync(dto);
            if (id <= 0) return BadRequest("Failed to create product.");
            return Ok(new { message = "Product created successfully", productId = id });
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody] Product product)
        {
            var res = await _repository.UpdateAsync(product);
            return res == 1 ? Ok("Product updated successfully.") : BadRequest("Update failed.");
        }

        [HttpDelete("{productId}/{businessId}")]
        public async Task<IActionResult> Delete(int productId, int businessId)
        {
            var res = await _repository.DeleteAsync(productId, businessId);
            return res == 1 ? Ok("Product deleted (soft delete).") : NotFound("Product not found.");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var product = await _repository.GetByIdAsync(id);
            return product == null ? NotFound() : Ok(product);
        }

        [HttpGet("list")]
        public async Task<IActionResult> List([FromQuery] int? businessId, [FromQuery] int? categoryId,
            [FromQuery] string? search, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        {
            var result = await _repository.ListAsync(businessId, categoryId, search, page, pageSize);
            return Ok(result);
        }

        [HttpPost("add-image")]
        public async Task<IActionResult> AddImage(int productId, int businessId, string imageUrl, string? altText, bool isPrimary, int sortOrder)
        {
            var res = await _repository.AddImageAsync(productId, businessId, imageUrl, altText, isPrimary, sortOrder);
            return res == 1 ? Ok("Image added.") : BadRequest("Failed to add image.");
        }

        [HttpDelete("delete-image/{imageId}/{businessId}")]
        public async Task<IActionResult> DeleteImage(int imageId, int businessId)
        {
            var res = await _repository.DeleteImageAsync(imageId, businessId);
            return res == 1 ? Ok("Image deleted (soft delete).") : NotFound("Image not found.");
        }
    }
}
