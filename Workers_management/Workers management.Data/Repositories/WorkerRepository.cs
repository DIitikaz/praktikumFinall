using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Workers_management.Core.models;
using Workers_management.Core.Repositories;
using Microsoft.EntityFrameworkCore;
namespace Workers_management.Data.Repositories
{
    public class WorkerRepository:IWorkerRepository
    {
        private readonly DataContext _dataContext;
        public WorkerRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
    
        public async Task<Worker> PostAsync(Worker worker)
        {
            _dataContext.Workers.Add(worker);
            await _dataContext.SaveChangesAsync();
            return worker;
        }

        public async Task DeletesAync(int id)
        {
            var worker1 = await GetByIdAsync(id);
            var worker2= await GetByIdAsync(id);
            worker2.Status = false;
            _dataContext.Entry(worker1).CurrentValues.SetValues(worker2);
            await _dataContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<Worker>> GetAllAsync()
        {
            return await _dataContext.Workers.ToListAsync();
        }

        public async Task<Worker> GetByIdAsync(int id)
        {
            return await _dataContext.Workers
            .Include(x => x.Roles) 
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Worker> GetByIdAsync(string id)
        {
            return await _dataContext.Workers
            .Include(x => x.Roles)
                .FirstOrDefaultAsync(x =>x.WorkerId==id );
        }
        public async Task<Worker> UpdateAsync(int id,Worker worker)
        {
            var worker1 = await GetByIdAsync(id);
            worker1.Roles = worker.Roles;
            _dataContext.Entry(worker1).CurrentValues.SetValues(worker);
            await _dataContext.SaveChangesAsync();
            return worker;
        }
    }
}
