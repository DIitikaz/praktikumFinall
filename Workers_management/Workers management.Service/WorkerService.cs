using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Workers_management.Core.models;
using Workers_management.Core.Repositories;
using Workers_management.Core.Services;

namespace Workers_management.Service
{
    public class WorkerService:IWorkerService
    {
        private readonly IWorkerRepository _workerRepositotry;
        public WorkerService(IWorkerRepository workerRepositotry)
        {
            _workerRepositotry=workerRepositotry;   
        }
        public async Task<Worker> PostAsync(Worker worker)
        {
            var workerById =  await _workerRepositotry.GetByIdAsync(worker.WorkerId);
         
            if (workerById == null)
            {
                worker.Status = true;
                var workerId = worker != null && worker.WorkerId != null && worker.WorkerId.All(char.IsDigit) && worker.WorkerId.Length == 9;
                var firstName = worker != null && worker.FirstName != null && worker.FirstName.Length > 2;
                var lastName = worker != null && worker.LastName != null && worker.LastName.Length > 2;
                var roelsDates = worker != null && worker.Roles.TrueForAll(r => r.Date_of_entry_into_office > worker.Start_of_work_date);
                bool areAllRoleNameIdsUnique = worker != null && worker.Roles.Select(r => r.RoleNameId).Distinct().Count() == worker.Roles.Count;

                if (workerId && firstName && lastName && roelsDates && areAllRoleNameIdsUnique)
                    return await _workerRepositotry.PostAsync(worker);

                return null;
            }
            else
            {
                if(workerById.Status==false)
                {
                    worker.Id=workerById.Id;
                    return await UpdateAsync(workerById.Id, worker);
                }

                return null;    


                  
            }
        }


        public async Task DeletesAync(int id)
        {
             await _workerRepositotry.DeletesAync(id);
        }


        public async Task<IEnumerable<Worker>> GetAllAsync()
        {
            var list= await _workerRepositotry.GetAllAsync();
            return list.Where(x=>x.Status==true);
        }


        public async Task<Worker> GetByIdAsync(string id)
        {
            return await _workerRepositotry.GetByIdAsync(id);   
        }


        public async Task<Worker> GetByIdAsync(int id)
        {
            return await _workerRepositotry.GetByIdAsync(id);
        }

        public async Task<Worker> UpdateAsync(int id,Worker worker)
        {
            worker.Status = true;
            var workerId = worker != null && worker.WorkerId != null && worker.WorkerId.All(char.IsDigit)&& worker.WorkerId.Length == 9;
            var firstName = worker != null && worker.FirstName != null && worker.FirstName.Length > 2;
            var lastName = worker != null && worker.LastName != null && worker.LastName.Length > 2;
            var roelsDates = worker != null && worker.Roles.TrueForAll(r => r.Date_of_entry_into_office > worker.Start_of_work_date);
            bool areAllRoleNameIdsUnique = worker != null && worker.Roles.Select(r => r.RoleNameId).Distinct().Count() == worker.Roles.Count;

            if (workerId && firstName && lastName && roelsDates&& areAllRoleNameIdsUnique)
                return await _workerRepositotry.UpdateAsync( id,worker);
            return null;
        }
    }
}
