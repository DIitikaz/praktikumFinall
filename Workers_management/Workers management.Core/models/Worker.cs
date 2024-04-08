using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Workers_management.Core.models
{
   
    public class Worker
    {
        public int Id { get; set; }
        public string WorkerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Start_of_work_date { get; set; }
        public DateTime Date_Born { get; set; }
        public bool Gender { get; set; }
        public bool Status { get; set; }
        public List<WorkerRole> Roles { get; set; }




    }
}
