using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Nicheon.Application.Interfaces;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Nicheon.Shared.SharedRepositories
{
    public class JwtTokenService : IJwtTokenService
    {
        private readonly string _secret;
        private readonly string _issuer;
        private readonly string _audience;
        private readonly int _expiryHours;

        public JwtTokenService(IConfiguration config)
        {
            _secret = config["Jwt:Secret"] ?? throw new ArgumentNullException("Jwt:Secret");
            _issuer = config["Jwt:Issuer"] ?? "NicheonServer";
            _audience = config["Jwt:Audience"] ?? "NicheonClient";
            _expiryHours = int.TryParse(config["Jwt:ExpiryHours"], out var h) ? h : 12;
        }

        public string GenerateToken(string userId, string fullName, string email, string role)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
    {
        new Claim(JwtRegisteredClaimNames.Sub, userId ?? ""),
        new Claim(JwtRegisteredClaimNames.Email, email ?? ""),
        new Claim(ClaimTypes.Role, role ?? "User"),
        new Claim("role", role ?? "User"), // ✅ Add plain role claim for Swagger/Auth
        new Claim("FullName", fullName ?? ""),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
    };

            var token = new JwtSecurityToken(
                issuer: _issuer,
                audience: _audience,
                claims: claims,
                expires: DateTime.UtcNow.AddHours(_expiryHours),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


    }
}
