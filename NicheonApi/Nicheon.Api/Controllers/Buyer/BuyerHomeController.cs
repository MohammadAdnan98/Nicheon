using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nicheon.Application.Interfaces;

namespace Nicheon.Api.Controllers.Buyer
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class BuyerHomeController : ControllerBase
    {
        private readonly IBuyerHomeRepository _repo;

        public BuyerHomeController(IBuyerHomeRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search(
            [FromQuery] string? q,
            [FromQuery] string? metalIds,
            [FromQuery] string? styleIds,        // maps to CategoryIds
            [FromQuery] string? karats,
            [FromQuery] decimal? minPrice,
            [FromQuery] decimal? maxPrice,
            [FromQuery] int? isHallmarked,
            [FromQuery] string sort = "relevance",
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 20
        )
        {
            var data = await _repo.SearchProductsAsync(
                q, metalIds, styleIds, karats, minPrice, maxPrice, isHallmarked,
                sort, page, pageSize
            );

            return Ok(new
            {
                success = true,
                message = "",
                page,
                pageSize,
                totalCount = data.FirstOrDefault()?.TotalCount ?? 0,
                data
            });
        }

        [HttpGet("home")]
        public async Task<IActionResult> Home(int UserId)
        {
            //int userId = int.Parse(User.FindFirst("UserId")!.Value);

            var data = await _repo.GetHomeMetadataAsync(UserId);

            return Ok(new
            {
                success = true,
                message = "",
                data
            });
        }

        [HttpPost("log-view/{productId}")]
        public async Task<IActionResult> LogView(int productId)
        {
            int? userId = null;
            if (User.Identity?.IsAuthenticated == true)
            {
                userId = int.Parse(User.FindFirst("UserId")!.Value);
            }
            await _repo.LogProductViewAsync(userId, productId);
            return Ok(new { success = true });
        }

        [HttpGet("trending")]
        public async Task<IActionResult> Trending([FromQuery] int days = 14, [FromQuery] int limit = 12)
        {
            var data = await _repo.GetTrendingProductsAsync(days, limit);
            return Ok(new { success = true, data });
        }

        [HttpGet("recommendations")]
        public async Task<IActionResult> Recommendations([FromQuery] int limit = 12)
        {
            int? userId = null;
            if (User.Identity?.IsAuthenticated == true)
                userId = int.Parse(User.FindFirst("UserId")!.Value);

            var data = await _repo.GetRecommendationsAsync(userId, limit);
            return Ok(new { success = true, data });
        }

        [HttpGet("top-categories")]
        public async Task<IActionResult> TopCategories([FromQuery] int limit = 8, [FromQuery] int days = 30)
        {
            int? userId = null;
            if (User.Identity?.IsAuthenticated == true)
                userId = int.Parse(User.FindFirst("UserId")!.Value);

            var data = await _repo.GetTopCategoriesAsync(userId, limit, days);
            return Ok(new { success = true, data });
        }

        [HttpPost("record-search")]
        public async Task<IActionResult> RecordSearch([FromBody] string searchTerm)
        {
            int? userId = null;
            if (User.Identity?.IsAuthenticated == true)
                userId = int.Parse(User.FindFirst("UserId")!.Value);

            await _repo.RecordSearchTermAsync(userId, searchTerm);
            return Ok(new { success = true });
        }

        [HttpGet("top-searches")]
        public async Task<IActionResult> TopSearches([FromQuery] int days = 30, [FromQuery] int limit = 10)
        {
            var data = await _repo.GetTopSearchesAsync(days, limit);
            return Ok(new { success = true, data });
        }

        [HttpGet("banners")]
        public async Task<IActionResult> Banners()
        {
            var data = await _repo.GetActiveBannersAsync();
            return Ok(new { success = true, data });
        }


    }

}
