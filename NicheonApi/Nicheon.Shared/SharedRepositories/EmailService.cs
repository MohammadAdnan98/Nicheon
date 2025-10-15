using Nicheon.Application.Interfaces; // ✅ must be present

namespace Nicheon.Shared.SharedRepositories
{
    public class EmailService : IEmailService
    {
        public async Task SendEmailAsync(string toEmail, string subject, string body)
        {
            var smtpClient = new System.Net.Mail.SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new System.Net.NetworkCredential("your-email@gmail.com", "your-app-password"),
                EnableSsl = true,
            };

            var mail = new System.Net.Mail.MailMessage("your-email@gmail.com", toEmail, subject, body)
            {
                IsBodyHtml = true
            };

            await smtpClient.SendMailAsync(mail);
        }
    }
}
