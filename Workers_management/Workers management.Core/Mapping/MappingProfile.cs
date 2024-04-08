using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Workers_management.Core.DTOs;
using Workers_management.Core.models;

namespace Workers_management.Core.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Worker, WorkerDto>().ReverseMap();
            CreateMap<WorkerRole, WorkerRoleDto>();
            CreateMap<RoleName, RoleNameDto>()
         .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name));

        }
    }
}
