using Nicheon.Application.Interfaces;
using Microsoft.Extensions.Configuration;
using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace Nicheon.Shared.SharedRepositories
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;
        private readonly string _env;

        public EmailService(IConfiguration config)
        {
            _config = config;
            _env = _config["AppSettings:Environment"] ?? "Development";
        }

        public async Task SendEmailAsync(string toEmail, string subject, string body)
        {
            try
            {
                // 🔹 1️⃣ For LOCAL / TEST ENVIRONMENTS — just log the email instead of sending it
                if (_env.Equals("Development", StringComparison.OrdinalIgnoreCase) ||
                    _env.Equals("Test", StringComparison.OrdinalIgnoreCase))
                {
                    Console.WriteLine("\n--- EMAIL LOG (TEST MODE) ---");
                    Console.WriteLine($"To: {toEmail}");
                    Console.WriteLine($"Subject: {subject}");
                    Console.WriteLine($"Body: {body}");
                    Console.WriteLine("-----------------------------\n");
                    return; // ⛔ no SMTP send
                }

                // 🔹 2️⃣ PRODUCTION SMTP SETTINGS (real email sending)
                string smtpHost = _config["EmailSettings:SmtpHost"] ?? "smtp.gmail.com";
                int smtpPort = Convert.ToInt32(_config["EmailSettings:SmtpPort"] ?? "587");
                string senderEmail = _config["EmailSettings:SenderEmail"];
                string senderPassword = _config["EmailSettings:SenderPassword"];

                if (string.IsNullOrEmpty(senderEmail) || string.IsNullOrEmpty(senderPassword))
                    throw new Exception("SMTP credentials not configured properly.");

                using (var smtpClient = new SmtpClient(smtpHost, smtpPort))
                {
                    smtpClient.Credentials = new NetworkCredential(senderEmail, senderPassword);
                    smtpClient.EnableSsl = true;

                    var mail = new MailMessage(senderEmail, toEmail, subject, body)
                    {
                        IsBodyHtml = true
                    };

                    await smtpClient.SendMailAsync(mail);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"⚠️ Email sending failed: {ex.Message}");
                // Optional: log this error to database or monitoring service
                throw; // rethrow for repository to handle
            }
        }
    }
}
