using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nicheon.Application.Interfaces;
using System.IO;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System.Linq;

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

        // POST api/file/UploadProductImages/{businessId}/{productId}
        //[HttpPost("UploadProductImages/{businessId:int}/{productId:int}")]
        //public async Task<IActionResult> UploadProductImages(int businessId, int productId, [FromForm] List<IFormFile> files)
        //{
        //    if (files == null || files.Count == 0) return BadRequest("No files uploaded.");

        //    // ensure limit 1..6
        //    if (files.Count > 6) return BadRequest("Maximum 6 images allowed.");

        //    // folder path inside content root
        //    var uploadRoot = Path.Combine(_env.ContentRootPath, "Uploads", "ProductImages", $"Business_{businessId}", $"Product_{productId}");
        //    if (!Directory.Exists(uploadRoot)) Directory.CreateDirectory(uploadRoot);

        //    var results = new List<object>();
        //    int sort = 1;

        //    foreach (var file in files)
        //    {
        //        if (file.Length == 0) continue;

        //        var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
        //        var allowed = new[] { ".jpg", ".jpeg", ".png", ".webp", ".gif" };
        //        if (!allowed.Contains(ext)) continue;

        //        var fileName = $"{Guid.NewGuid():N}{ext}";
        //        var filePath = Path.Combine(uploadRoot, fileName);

        //        using (var stream = new FileStream(filePath, FileMode.Create))
        //        {
        //            await file.CopyToAsync(stream);
        //        }

        //        // relative path stored in DB
        //        var relativePath = $"/Uploads/ProductImages/Business_{businessId}/Product_{productId}/{fileName}";

        //        // save metadata in DB via repository
        //        var (result, imageId) = await _fileRepo.AddImageAsync(productId, businessId, relativePath, file.FileName, sort == 1, sort);

        //        results.Add(new
        //        {
        //            ImageId = imageId,
        //            ImageUrl = $"{Request.Scheme}://{Request.Host}{relativePath}",
        //            Result = result
        //        });

        //        sort++;
        //    }

        //    return Ok(new { message = "Uploaded", images = results });
        //}   



        [HttpPost("UploadProductImages/{businessId:int}/{productId:int}")]
        public async Task<IActionResult> UploadProductImages(int businessId, int productId, [FromForm] List<IFormFile> files)
        {
            if (files == null || files.Count == 0)
                return BadRequest("No files uploaded.");

            if (files.Count > 6)
                return BadRequest("Maximum 6 images allowed.");

            var folder = Path.Combine(_env.ContentRootPath, "Uploads", "ProductImages",
                $"Business_{businessId}", $"Product_{productId}");

            if (!Directory.Exists(folder))
                Directory.CreateDirectory(folder);

            var output = new List<object>();
            int sortOrder = 1;

            foreach (var file in files)
            {
                if (file.Length == 0) continue;

                var ext = Path.GetExtension(file.FileName).ToLower();
                var allowed = new[] { ".jpg", ".jpeg", ".png", ".webp" };
                if (!allowed.Contains(ext)) continue;

                var fileName = $"{Guid.NewGuid():N}{ext}";
                var filePath = Path.Combine(folder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                var relativePath = $"/Uploads/ProductImages/Business_{businessId}/Product_{productId}/{fileName}";

                var (result, imageId) = await _fileRepo.AddImageAsync(
                    productId,
                    businessId,
                    relativePath,
                    file.FileName,
                    sortOrder == 1,
                    sortOrder
                );

                output.Add(new
                {
                    ImageId = imageId,
                    ImageUrl = $"{Request.Scheme}://{Request.Host}{relativePath}"
                });

                sortOrder++;
            }

            return Ok(new { message = "Uploaded", images = output });
        }

        [HttpGet("GetProductImages/{productId:int}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetProductImages(int productId)
        {
            var images = await _fileRepo.GetProductImagesAsync(productId);
            var host = $"{Request.Scheme}://{Request.Host}";
            var formatted = images.Select(i => new
            {
                i.ImageId,
                i.ProductId,
                i.BusinessId,
                ImageUrl = $"{host}{i.ImageUrl}",
                i.IsPrimary,
                i.SortOrder
            });
            return Ok(formatted);
        }

        //[HttpDelete("DeleteProductImage/{imageId:int}")]
        //public async Task<IActionResult> DeleteProductImage(int imageId)
        //{
        //    var res = await _fileRepo.DeleteImageAsync(imageId);
        //    return res == 1 ? Ok(new { message = "Deleted" }) : BadRequest(new { message = "Delete failed" });
        //}    


        // DELETE IMAGE
        [HttpDelete("DeleteProductImage/{imageId:int}")]
        public async Task<IActionResult> DeleteProductImage(int imageId)
        {
            var result = await _fileRepo.DeleteImageAsync(imageId);
            return result == 1
                ? Ok(new { message = "Image deleted" })
                : BadRequest(new { message = "Delete failed" });
        }
    }
}
