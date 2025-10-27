using System.ComponentModel.DataAnnotations;

namespace Nicheon.Domain.Entities
{
    public class RegisterModel
    {
        [Required(ErrorMessage = "Full name is required.")]
        public string FullName { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Mobile number is required.")]
        [Phone(ErrorMessage = "Invalid mobile number format.")]
        public string Mobile { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Role is required.")]
        public string Role { get; set; } // Seller | Buyer | Manufacturer | Wholesaler | Retailer

        public string? BusinessName { get; set; }
        public string? BusinessType { get; set; } // optional, can be same as Role
        public string? GSTNumber { get; set; }

        [Required(ErrorMessage = "Address is required.")]
        public string? Address { get; set; }

        public string? Landmark { get; set; }

        [Required(ErrorMessage = "City is required.")]
        public string? City { get; set; }

        [Required(ErrorMessage = "State is required.")]
        public string? State { get; set; }

        public string? Country { get; set; } = "India";

        [Required(ErrorMessage = "Pincode is required.")]
        [StringLength(10, MinimumLength = 5, ErrorMessage = "Pincode must be 5–10 digits.")]
        public string? Pincode { get; set; }
    }

    public class ResetPasswordModel
    {
        [Required, EmailAddress]
        public string Email { get; set; }

        [Required, StringLength(100, MinimumLength = 6)]
        public string NewPassword { get; set; }

        [Required, StringLength(10, MinimumLength = 4)]
        public string Otp { get; set; }
    }

    public class ForgotPasswordModel
    {
        [Required, EmailAddress]
        public string Email { get; set; }
    }

    public class VerifyOtpModel
    {
        [Required, EmailAddress]
        public string Email { get; set; }

        [Required, StringLength(10, MinimumLength = 4)]
        public string Otp { get; set; }
    }

    public class LoginModel
    {
        [Required(ErrorMessage = "Username or email is required.")]
    public string Username { get; set; }

    [Required(ErrorMessage = "Password is required.")]
    public string Password { get; set; }
    }

    public class LoginResponseModel
    {
        public int UserId { get; set; }
        public int LoginId { get; set; }
        public string Username { get; set; } = "";
        public string FullName { get; set; } = "";
        public string PrimaryEmail { get; set; } = "";
        public string PrimaryPhone { get; set; } = "";
        public string Role { get; set; } = "";
        public string? BusinessName { get; set; }
        public string? BusinessType { get; set; }
        public string? GSTNumber { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? Pincode { get; set; }

        // JWT token will be set after SP runs
        public string? Token { get; set; }
    }

}
