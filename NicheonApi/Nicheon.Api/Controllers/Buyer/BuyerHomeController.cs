using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nicheon.Application.Interfaces;

namespace Nicheon.Api.Controllers.Buyer
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class BuyerHomeController : Controller
    {
        private readonly IBuyerHomeRepository _repo;

        public BuyerHomeController(IBuyerHomeRepository repo)
        {
            _repo = repo;
        }

        // GET: api/BuyerSearch
        [HttpGet]
        public async Task<IActionResult> Search(
            [FromQuery] string? q,
            [FromQuery] string? metalIds,
            [FromQuery] string? styleIds,
            [FromQuery] string? karats,
            [FromQuery] decimal? minPrice,
            [FromQuery] decimal? maxPrice,
            [FromQuery] int? isHallmarked,
            [FromQuery] string sort = "relevance",
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 20
        )
        {
            var result = await _repo.SearchProductsAsync(
                q, metalIds, styleIds, karats, minPrice, maxPrice, isHallmarked,
                sort, page, pageSize
            );

            return Ok(result);
        }
    }
}
