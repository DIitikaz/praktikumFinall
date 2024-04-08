using Workers_management.Core.models;

namespace Workers_management.API.Models
{
    public class WorkerPostModel
    {

        public string WorkerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Start_of_work_date { get; set; }
        public DateTime Date_Born { get; set; }
        public bool Gender { get; set; }

        public List<WorkerRolePostModel> Roles { get; set; }

    }
}
