using AutoMapper;
using Workers_management.API.Models;
using Workers_management.Core.models;

namespace Workers_management.API.Mapping
{
    public class PostModelMappingProfile:Profile
    {
        public PostModelMappingProfile()
        {
            CreateMap<WorkerPostModel, Worker>();
            CreateMap<WorkerRolePostModel, WorkerRole>();
            CreateMap<RoleNamePostModel, RoleName>();
        } 
    }
}
