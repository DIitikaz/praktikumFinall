using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Workers_management.Core.models;

namespace Workers_management.Core.Repositories
{
    public interface IRoleNameRepository
    {
        public Task<IEnumerable<RoleName>> GetAllAsync();
        public Task<RoleName> PostAsync(RoleName roleName);
    }
}
