using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Workers_management.API.Models;
using Workers_management.Core.DTOs;
using Workers_management.Core.models;
using Workers_management.Core.Services;
using Workers_management.Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Workers_management.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class RoleNameController : ControllerBase
    {
        private readonly IRoleNameService _roleNameService;
        private readonly IMapper _mapper;
        public RoleNameController(IRoleNameService roleNameService,IMapper mapper)
        {
            _roleNameService = roleNameService;
            _mapper = mapper;   
        }

        //GET: api/<RolesController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var workers = await _roleNameService.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<RoleNameDto>>(workers));
        }


        // POST api/<RolesController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] RoleNamePostModel value)
        {
            var new_RoleName = await _roleNameService.PostAsync(_mapper.Map<RoleName>(value));
            return Ok(_mapper.Map<RoleNameDto>(new_RoleName));
        }

       

       
    }
}
