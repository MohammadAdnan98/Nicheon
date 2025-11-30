using System.Collections.Generic;
using System.Threading.Tasks;

namespace Nicheon.Application.Interfaces
{
    public interface IFileRepository
    {
        Task<(int Result, int ImageId)> UploadBusinessLogo(int businessId, string imageUrl);
        Task<(int Result, int ImageId)> AddImageAsync(int productId, int businessId, string imageUrl, string altText, bool isPrimary, int sortOrder);
        Task<IEnumerable<dynamic>> GetProductImagesAsync(int productId);
        Task<int> DeleteImageAsync(int imageId);
    }
}
