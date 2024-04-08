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
    public class UserService:IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
    
        public UserModel GetByUserNameAndPassword(string userName, string password)
        {
            return _userRepository.GetByUserNameAndPassword(userName, password);    
        }

       
    }
}
