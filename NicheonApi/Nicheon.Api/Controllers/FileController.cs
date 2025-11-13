using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nicheon.Application.Interfaces;
using System.IO;
using System.Threading.Tasks;

namespace Nicheon.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class FileController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;
        private readonly IFileRepository _fileRepo;

        public FileController(IWebHostEnvironment env, IFileRepository fileRepo)
        {
            _env = env;
            _fileRepo = fileRepo;
        }

        // ✅ Upload Product Images
        [HttpPost("UploadProductImages/{businessId:int}/{productId:int}")]
        public async Task<IActionResult> UploadProductImages(int businessId, int productId, [FromForm] List<IFormFile> files)
        {
            if (files == null || files.Count == 0)
                return BadRequest("No files uploaded.");

            // Upload folder path
            string rootPath = Path.Combine(_env.ContentRootPath, "Uploads", "ProductImages", $"Business_{businessId}", $"Product_{productId}");
            if (!Directory.Exists(rootPath))
                Directory.CreateDirectory(rootPath);

            var uploadedList = new List<object>();
            int sort = 1;

            foreach (var file in files)
            {
                string fileExt = Path.GetExtension(file.FileName);
                string uniqueName = $"{Guid.NewGuid():N}{fileExt}";
                string fullPath = Path.Combine(rootPath, uniqueName);

                // Save file
                using (var stream = new FileStream(fullPath, FileMode.Create))
                    await file.CopyToAsync(stream);

                string relativePath = $"/Uploads/ProductImages/Business_{businessId}/Product_{productId}/{uniqueName}";

                // Save metadata in DB
                int imageId = await _fileRepo.AddImageAsync(productId, businessId, relativePath, file.FileName, sort == 1, sort);

                uploadedList.Add(new
                {
                    ImageId = imageId,
                    ImageUrl = $"{Request.Scheme}://{Request.Host}{relativePath}"
                });

                sort++;
            }

            return Ok(new { message = "Images uploaded successfully", images = uploadedList });
        }

        // ✅ Get Product Images
        [HttpGet("GetProductImages/{productId:int}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetProductImages(int productId)
        {
            var result = await _fileRepo.GetProductImagesAsync(productId);
            string host = $"{Request.Scheme}://{Request.Host}";

            var formatted = result.Select(img => new
            {
                img.ImageId,
                img.ProductId,
                img.BusinessId,
                img.IsPrimary,
                img.SortOrder,
                ImageUrl = $"{host}{img.ImageUrl}"
            });

            return Ok(formatted);
        }

        // ✅ Delete Product Image
        [HttpDelete("DeleteProductImage/{imageId:int}")]
        public async Task<IActionResult> DeleteProductImage(int imageId)
        {
            await _fileRepo.DeleteImageAsync(imageId);
            return Ok(new { message = "Image deleted successfully" });
        }
    }
}
