using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Workers_management.Core.DTOs
{
    public class WorkerRoleDto
    {
        public int RoleNameId { get; set; }
        public bool Managerial { get; set; }
        public DateTime Date_of_entry_into_office { get; set; }
    }
}
