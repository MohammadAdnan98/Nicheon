using Dapper;
using Nicheon.Application.DTOs;
using Nicheon.Application.Interfaces;
using System.Data;
using System.Threading.Tasks;

namespace Nicheon.Persistence.Repositories
{
    public class BusinessProfileRepository : IBusinessProfileRepository
    {
        private readonly IDbConnection _db;

        public BusinessProfileRepository(IDbConnection db)
        {
            _db = db;
        }

        public async Task<BusinessProfileDto?> GetByBusinessIdAsync(int businessId)
        {
            var sql = "sp_GetBusinessProfileById";
            var res = await _db.QueryFirstOrDefaultAsync<BusinessProfileDto>(
                sql,
                new { BusinessId = businessId },
                commandType: CommandType.StoredProcedure
            );

            return res;
        }

        public async Task<int> UpdateProfileAsync(UpdateBusinessProfileDto dto)
        {
            var p = new DynamicParameters();
            p.Add("@BusinessId", dto.BusinessId);
            p.Add("@BusinessName", dto.BusinessName);
            p.Add("@BusinessType", dto.BusinessType);
            p.Add("@GSTNumber", dto.GSTNumber);
            p.Add("@PAN", dto.PAN);
            p.Add("@fullName", dto.fullName);
            p.Add("@ContactPhone", dto.ContactPhone);
            p.Add("@BusinessEmail", dto.BusinessEmail);
            p.Add("@Address", dto.Address);
            p.Add("@Landmark", dto.Landmark);
            p.Add("@City", dto.City);
            p.Add("@State", dto.State);
            p.Add("@Country", dto.Country);
            p.Add("@Pincode", dto.Pincode);
            p.Add("@OutResult", dbType: DbType.Int32, direction: ParameterDirection.Output);

            await _db.ExecuteAsync("sp_UpdateBusinessProfile", p, commandType: CommandType.StoredProcedure);

            return p.Get<int>("@OutResult");
        }

    }
}
