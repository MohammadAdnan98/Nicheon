using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nicheon.Application.DTOs;
using Nicheon.Application.Interfaces;
using System.Threading.Tasks;

namespace Nicheon.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class SellerProfileController : ControllerBase
    {
        private readonly IBusinessProfileRepository _repo;
        private readonly IFileRepository _fileRepo;
        private readonly IWebHostEnvironment _env;

        public SellerProfileController(IBusinessProfileRepository repo, IFileRepository fileRepo,
            IWebHostEnvironment env)
        {
            _repo = repo;
            _fileRepo = fileRepo;
            _env = env;
        }

        // GET api/SellerProfile/GetByBusinessId/2
        [HttpGet("GetByBusinessId/{businessId:int}")]
        [AllowAnonymous] // optional: allow anonymous if profile is public
        public async Task<IActionResult> GetByBusinessId(int businessId)
        {
            var data = await _repo.GetByBusinessIdAsync(businessId);
            if (data == null) return NotFound();
            return Ok(data);
        }

        // POST api/SellerProfile/UpdateProfile
        [HttpPost("UpdateProfile")]

        public async Task<IActionResult> UpdateProfile([FromForm] UpdateBusinessProfileDto dto)
        {
            // 1️⃣ SAVE BASIC PROFILE
            var result = await _repo.UpdateProfileAsync(dto);
            if (result != 1)
                return BadRequest(new { message = "Profile update failed" });

            string? logoPath = null;

            // 2️⃣ UPLOAD LOGO IF AVAILABLE
            if (dto.LogoFile != null)
            {
                var ext = Path.GetExtension(dto.LogoFile.FileName).ToLower();
                var allowed = new[] { ".jpg", ".jpeg", ".png", ".webp" };

                if (!allowed.Contains(ext))
                    return BadRequest("Invalid file type");

                var folder = Path.Combine(_env.ContentRootPath, "Uploads", "BusinessLogo", $"Business_{dto.BusinessId}");

                if (!Directory.Exists(folder))
                    Directory.CreateDirectory(folder);

                var fileName = $"logo_{Guid.NewGuid():N}{ext}";
                var fullPath = Path.Combine(folder, fileName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    await dto.LogoFile.CopyToAsync(stream);
                }

                logoPath = $"/Uploads/BusinessLogo/Business_{dto.BusinessId}/{fileName}";

                // Save logo path
                await _fileRepo.UploadBusinessLogo(dto.BusinessId, logoPath);
            }

            return Ok(new
            {
                message = "Profile updated successfully",
                logo = logoPath
            });
        }
    }
}
