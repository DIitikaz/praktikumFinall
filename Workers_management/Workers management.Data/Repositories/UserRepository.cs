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
    public class UserRepository:IUserRepository
    {
        private readonly DataContext _dataContext;
        public UserRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public  UserModel GetByUserNameAndPassword(string userName, string password)
        {
            return _dataContext.Users.FirstOrDefault(u => u.Name == userName && u.Password == password);
        }
    }
}
