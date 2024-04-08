using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Workers_management.Core.models;

namespace Workers_management.Core.Services
{
    public interface IWorkerService
    {
        public Task<Worker> PostAsync(Worker worker);


        public Task DeletesAync(int id);


        public Task<IEnumerable<Worker>> GetAllAsync();


        public Task<Worker> GetByIdAsync(int id);
        public Task<Worker> GetByIdAsync(string id);

        public Task<Worker> UpdateAsync(int id ,Worker worker);
    }
}
