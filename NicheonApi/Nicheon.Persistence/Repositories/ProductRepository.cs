﻿using Dapper;
using Nicheon.Application.DTOs;
using Nicheon.Application.Interfaces;
using Nicheon.Domain.Entities;
using System.Data;

namespace Nicheon.Persistence.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly IDbConnection _db;

        public ProductRepository(IDbConnection db)
        {
            _db = db;
        }

        public async Task<int> CreateAsync(ProductCreateDto dto)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@BusinessId", dto.BusinessId);
            parameters.Add("@CategoryId", dto.CategoryId);
            parameters.Add("@MetalId", dto.MetalId);
            parameters.Add("@JewelleryTypeId", dto.JewelleryTypeId);
            parameters.Add("@SubTypeId", dto.SubTypeId);
            parameters.Add("@StyleId", dto.StyleId);
            parameters.Add("@ProductCode", dto.ProductCode);
            parameters.Add("@ProductName", dto.ProductName);
            parameters.Add("@ShortDescription", dto.ShortDescription);
            parameters.Add("@Description", dto.Description);
            parameters.Add("@Gender", dto.Gender);
            parameters.Add("@Colour", dto.Colour);
            parameters.Add("@Karat", dto.Karat);
            parameters.Add("@WeightGrams", dto.WeightGrams);
            parameters.Add("@PricePerGram", dto.PricePerGram);
            parameters.Add("@MakingCharges", dto.MakingCharges);
            parameters.Add("@MOQ", dto.MOQ);
            parameters.Add("@Stock", dto.Stock);
            parameters.Add("@IsHallmarked", dto.IsHallmarked);
            parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);
            parameters.Add("@OutProductId", dbType: DbType.Int32, direction: ParameterDirection.Output);

            await _db.ExecuteAsync("sp_CreateProduct", parameters, commandType: CommandType.StoredProcedure);
            int result = parameters.Get<int>("@Result");
            int newId = parameters.Get<int>("@OutProductId");

            return result == 1 ? newId : -1;
        }

        public async Task<int> UpdateAsync(Product product)
        {
            var parameters = new DynamicParameters(product);
            parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);
            await _db.ExecuteAsync("sp_UpdateProduct", parameters, commandType: CommandType.StoredProcedure);
            return parameters.Get<int>("@Result");
        }

        public async Task<int> DeleteAsync(int productId, int businessId)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@ProductId", productId);
            parameters.Add("@BusinessId", businessId);
            parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);
            await _db.ExecuteAsync("sp_DeleteProduct", parameters, commandType: CommandType.StoredProcedure);
            return parameters.Get<int>("@Result");
        }

        public async Task<Product?> GetByIdAsync(int productId)
        {
            using var multi = await _db.QueryMultipleAsync("sp_GetProductById",
                new { ProductId = productId },
                commandType: CommandType.StoredProcedure);

            var product = await multi.ReadFirstOrDefaultAsync<Product>();
            if (product != null)
            {
                product.Images = (await multi.ReadAsync<ProductImage>()).ToList();
            }
            return product;
        }

        public async Task<IEnumerable<Product>> ListAsync(int? businessId, int? categoryId, string? search, int page = 1, int pageSize = 20)
        {
            var parameters = new
            {
                BusinessId = businessId,
                CategoryId = categoryId,
                Search = search,
                Page = page,
                PageSize = pageSize
            };

            return await _db.QueryAsync<Product>("sp_ListProducts", parameters, commandType: CommandType.StoredProcedure);
        }

        public async Task<int> AddImageAsync(int productId, int businessId, string imageUrl, string? altText, bool isPrimary, int sortOrder)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@ProductId", productId);
            parameters.Add("@BusinessId", businessId);
            parameters.Add("@ImageUrl", imageUrl);
            parameters.Add("@AltText", altText);
            parameters.Add("@IsPrimary", isPrimary);
            parameters.Add("@SortOrder", sortOrder);
            parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);

            await _db.ExecuteAsync("sp_AddProductImage", parameters, commandType: CommandType.StoredProcedure);
            return parameters.Get<int>("@Result");
        }

        public async Task<int> DeleteImageAsync(int imageId, int businessId)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@ImageId", imageId);
            parameters.Add("@BusinessId", businessId);
            parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);
            await _db.ExecuteAsync("sp_DeleteProductImage", parameters, commandType: CommandType.StoredProcedure);
            return parameters.Get<int>("@Result");
        }
    }
}
