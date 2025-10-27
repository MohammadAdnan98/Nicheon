using Dapper;
using Nicheon.Application.Interfaces;
using Nicheon.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nicheon.Persistence.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly IDbConnection _db;

        public ProductRepository(IDbConnection db)
        {
            _db = db;
        }

        public async Task<IEnumerable<Product>> GetAllAsync()
        {
            var sql = "SELECT * FROM Users";
            return await _db.QueryAsync<Product>(sql);
        }

        public async Task<Product> GetByIdAsync(int id)
        {
            var sql = "SELECT * FROM ProductDetails WHERE ProductId = @Id";
            return await _db.QueryFirstOrDefaultAsync<Product>(sql, new { Id = id });
        }

        public async Task<int> CreateAsync(Product product)
        {
            var sql = @"INSERT INTO ProductDetails (ProductName, Price, SellerId, GarbageAgeInMonths) 
                    VALUES (@ProductName, @Price, @SellerId, @GarbageAgeInMonths);
                    SELECT CAST(SCOPE_IDENTITY() as int);";

            return await _db.ExecuteScalarAsync<int>(sql, product);
        }
    }

}
