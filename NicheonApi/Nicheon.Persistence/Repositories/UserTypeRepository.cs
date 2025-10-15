
using Dapper;
using Microsoft.Data.SqlClient;
using Nicheon.Application.Interfaces;
using Nicheon.Domain.Entities;
using Microsoft.Extensions.Configuration; // Ensure this namespace is included  

namespace Nicheon.Persistence.Repositories;

public class UserTypeRepository : IUserTypeRepository
{
    private readonly IConfiguration _configuration;
    private readonly string _connectionString;

    public UserTypeRepository(IConfiguration configuration)
    {
        _configuration = configuration;
        _connectionString = _configuration.GetConnectionString("DefaultConnection")!;
    }

    public async Task<IEnumerable<UserType>> GetAllAsync()
    {
        using var connection = new SqlConnection(_connectionString);
        var sql = "SELECT * FROM UserTypeMaster WHERE IsActive = 1";
        return await connection.QueryAsync<UserType>(sql);
    }

    public async Task<UserType?> GetByIdAsync(int id)
    {
        using var connection = new SqlConnection(_connectionString);
        var sql = "SELECT * FROM UserTypeMaster WHERE UserTypeId = @Id";
        return await connection.QueryFirstOrDefaultAsync<UserType>(sql, new { Id = id });
    }

    public async Task<int> AddAsync(UserType userType)
    {
        using var connection = new SqlConnection(_connectionString);
        var sql = @"INSERT INTO UserTypeMaster (UserTypeName, IsActive)  
                    VALUES (@UserTypeName, @IsActive);  
                    SELECT CAST(SCOPE_IDENTITY() as int)";
        return await connection.ExecuteScalarAsync<int>(sql, userType);
    }

    public async Task<bool> UpdateAsync(UserType userType)
    {
        using var connection = new SqlConnection(_connectionString);
        var sql = @"UPDATE UserTypeMaster  
                    SET UserTypeName = @UserTypeName, IsActive = @IsActive  
                    WHERE UserTypeId = @UserTypeId";
        var rows = await connection.ExecuteAsync(sql, userType);
        return rows > 0;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        using var connection = new SqlConnection(_connectionString);
        var sql = @"UPDATE UserTypeMaster SET IsActive = 0 WHERE UserTypeId = @Id";
        var rows = await connection.ExecuteAsync(sql, new { Id = id });
        return rows > 0;
    }
}
