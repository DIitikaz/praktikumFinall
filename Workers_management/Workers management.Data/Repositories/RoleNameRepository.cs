using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Workers_management.Core.models;
using Workers_management.Core.Repositories;

namespace Workers_management.Data.Repositories
{
    public class RoleNameRepository:IRoleNameRepository
    {
        private readonly DataContext _dataContext;
        public RoleNameRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<RoleName> PostAsync(RoleName roleName)
        {
            _dataContext.RolesName.Add(roleName);
            await _dataContext.SaveChangesAsync();
            return roleName;
        }

       
        public async Task<IEnumerable<RoleName>> GetAllAsync()
        {
            return await _dataContext.RolesName.ToListAsync();
        }

    }
}
