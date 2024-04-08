using Workers_management.Core.models;

namespace Workers_management.API.Models
{
    public class WorkerRolePostModel
    {
        public int WorkerId { get; set; }
        public int RoleNameId { get; set; }
        public bool Managerial { get; set; }
        public DateTime Date_of_entry_into_office { get; set; }
    }
}
