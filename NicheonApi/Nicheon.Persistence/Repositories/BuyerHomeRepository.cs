using Dapper;
using Nicheon.Application.DTOs;
using Nicheon.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nicheon.Persistence.Repositories
{
    public class BuyerHomeRepository : IBuyerHomeRepository
    {
        private readonly IDbConnection _db;

        public BuyerHomeRepository(IDbConnection db)
        {
            _db = db;
        }

        public async Task<IEnumerable<ProductSearchResultDto>> SearchProductsAsync(
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
        )
        {
            var p = new DynamicParameters();
            p.Add("@q", q);
            p.Add("@metalIds", metalIds);
            p.Add("@styleIds", styleIds);
            p.Add("@karats", karats);
            p.Add("@minPrice", minPrice);
            p.Add("@maxPrice", maxPrice);
            p.Add("@isHallmarked", isHallmarked);
            p.Add("@sort", sort);
            p.Add("@page", page);
            p.Add("@pageSize", pageSize);

            var result = await _db.QueryAsync<ProductSearchResultDto>(
                "sp_SearchProducts",
                p,
                commandType: CommandType.StoredProcedure
            );

            return result;
        }
    }
}
