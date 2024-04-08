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
    public class RoleNameService : IRoleNameService
    {
        private readonly IRoleNameRepository _roleNameRepository;
        public RoleNameService(IRoleNameRepository roleNameRepository)
        {
            _roleNameRepository = roleNameRepository;
        }
        public async Task<RoleName> PostAsync(RoleName roleName)
        {
            if(roleName!=null&&roleName.Name!=""&&roleName.Name.Length>=2)
            return await _roleNameRepository.PostAsync(roleName);
            return null;
        }


        public async Task<IEnumerable<RoleName>> GetAllAsync()
        {
            return await _roleNameRepository.GetAllAsync();
        }

    }
}
