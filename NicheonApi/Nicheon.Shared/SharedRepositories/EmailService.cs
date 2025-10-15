using Nicheon.Application.Interfaces;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace Nicheon.Shared.SharedRepositories
{
    public class EmailService : IEmailService
    {
        public async Task SendEmailAsync(string toEmail, string subject, string body)
        {
            var smtpClient = new SmtpClient("smtp.gmail.com") // replace with your mail host
            {
                Port = 587,
                Credentials = new NetworkCredential("youremail@gmail.com", "your-app-password"),
                EnableSsl = true
            };

            var mail = new MailMessage("youremail@gmail.com", toEmail, subject, body)
            {
                IsBodyHtml = true
            };

            await smtpClient.SendMailAsync(mail);
        }
    }
}
