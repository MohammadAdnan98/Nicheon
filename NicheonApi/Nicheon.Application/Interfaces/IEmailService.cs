using System.Threading.Tasks;

namespace Nicheon.Application.Interfaces
{
    public interface IEmailService
    {
        /// <summary>
        /// Send email with subject and body to a recipient
        /// </summary>
        Task SendEmailAsync(string toEmail, string subject, string body);
    }
}
