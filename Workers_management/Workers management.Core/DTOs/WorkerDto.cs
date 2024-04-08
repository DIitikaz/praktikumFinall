using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Workers_management.Core.DTOs
{
    public class WorkerDto
    {
        public int Id { get; set; }
        public string WorkerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Start_of_work_date { get; set; }
    }
}
