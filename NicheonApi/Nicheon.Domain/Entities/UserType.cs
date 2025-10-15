using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nicheon.Domain.Entities
{
    public class UserType
    {
        public int UserTypeId { get; set; }
        public string UserTypeName { get; set; } = string.Empty;
        public bool IsActive { get; set; }
    }
}
