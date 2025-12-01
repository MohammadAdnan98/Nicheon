using Nicheon.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nicheon.Application.Interfaces
{
    public interface IBuyerHomeRepository
    {

       
            Task<IEnumerable<ProductSearchResultDto>> SearchProductsAsync(
                string? q,
                string? metalIds,
                string? styleIds,
                string? karats,
                decimal? minPrice,
                decimal? maxPrice,
                int? isHallmarked,
                string? sort,
                int page,
                int pageSize
            );
       
    }
}
