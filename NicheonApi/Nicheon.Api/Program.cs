using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Data.SqlClient;
using Microsoft.OpenApi.Models;
using Nicheon.Application.Interfaces;
using Nicheon.Persistence.Repositories;
using Nicheon.Shared.SharedRepositories;
using System.Data;
using System.Text;
using Nicheon.Application.Shared;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;


var builder = WebApplication.CreateBuilder(args);

// ✅ Load appsettings.json
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

// ✅ Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials());
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// ✅ Proper Swagger + JWT setup
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Nicheon API",
        Version = "v1",
        Description = "B2B Jewelry Platform API for Seller, Buyer, Admin"
    });

    var jwtSecurityScheme = new OpenApiSecurityScheme
    {
        Scheme = "bearer",
        BearerFormat = "JWT",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Description = "Enter JWT token in the format: Bearer {your_token}",
        Reference = new OpenApiReference
        {
            Id = JwtBearerDefaults.AuthenticationScheme,
            Type = ReferenceType.SecurityScheme
        }
    };

    c.AddSecurityDefinition(jwtSecurityScheme.Reference.Id, jwtSecurityScheme);
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        { jwtSecurityScheme, Array.Empty<string>() }
    });
});

// ✅ Database Connection
builder.Services.AddScoped<IDbConnection>(sp =>
    new SqlConnection(builder.Configuration.GetConnectionString("DefaultConnection")));

// ✅ Dependency Injection
builder.Services.AddScoped<IAuthentication, AuthenticationRepository>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();
builder.Services.AddScoped<IOtpService, OtpService>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IDashboardService, DashboardRepository>();


// ✅ JWT Authentication Configuration
// ✅ JWT Authentication Configuration (FINAL FIX)
// ✅ JWT Authentication Configuration
var key = Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Secret"]!);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],

        ValidateAudience = true,
        ValidAudience = builder.Configuration["Jwt:Audience"],

        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),

        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero,

        RoleClaimType = "role",
        NameClaimType = ClaimTypes.NameIdentifier
    };

    // 👇 Add detailed diagnostics
    options.Events = new JwtBearerEvents
    {
        OnAuthenticationFailed = ctx =>
        {
            Console.WriteLine("JWT Authentication Failed:");
            Console.WriteLine($"  Exception: {ctx.Exception.GetType().Name}");
            Console.WriteLine($"  Message: {ctx.Exception.Message}");
            if (ctx.Exception.InnerException != null)
                Console.WriteLine($"  Inner: {ctx.Exception.InnerException.Message}");
            return Task.CompletedTask;
        },
        OnChallenge = ctx =>
        {
            Console.WriteLine("JWT Challenge Triggered:");
            Console.WriteLine($"  Error: {ctx.Error}");
            Console.WriteLine($"  Description: {ctx.ErrorDescription}");
            return Task.CompletedTask;
        },
        OnTokenValidated = ctx =>
        {
            Console.WriteLine("✅ Token successfully validated for:");
            Console.WriteLine($"  Subject: {ctx.Principal?.FindFirst(JwtRegisteredClaimNames.Sub)?.Value}");
            Console.WriteLine($"  Role: {ctx.Principal?.FindFirst(ClaimTypes.Role)?.Value}");
            return Task.CompletedTask;
        }
    };
});


var app = builder.Build();

// ✅ Swagger should be enabled in Development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        // 👇 DO NOT set RoutePrefix = string.Empty
        // Keep Swagger at /swagger/index.html (so launchUrl "swagger" works)
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Nicheon API v1");
    });
}

app.UseHttpsRedirection();
app.UseCors("AllowAngularApp");
app.UseAuthentication();  // 🔥 Must come before Authorization
app.UseAuthorization();

app.MapControllers();
app.Run();
