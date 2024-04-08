using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Workers_management.API.Models;
using Workers_management.Core.DTOs;
using Workers_management.Core.models;
using Workers_management.Core.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Workers_management.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class WorkerController : ControllerBase
    {
        private readonly IWorkerService _workerService;
        private readonly IMapper _mapper;
        public WorkerController(IWorkerService workerService ,IMapper mapper)
        {
            _workerService = workerService;
            _mapper = mapper;   
        }
    
        // GET: api/<WorkerController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var workers = await _workerService.GetAllAsync();   
            return Ok(_mapper.Map<IEnumerable<WorkerDto>>(workers));
        }

        // GET api/<WorkerController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var worker = await _workerService.GetByIdAsync(id);
            if(worker == null)
            {
                return NotFound();  
            }

            return Ok(worker);
        }

        // POST api/<WorkerController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] WorkerPostModel value)
        {
            var new_worker = await _workerService.PostAsync(_mapper.Map<Worker>(value));
            if(new_worker == null)
                return StatusCode(409, "worker already exists");

            return Ok(_mapper.Map < Worker >( new_worker));

        }

        // PUT api/<WorkerController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] WorkerPostModel value)
        {
            var worker = await _workerService.GetByIdAsync(id);
            if (worker == null)
            {
                return NotFound();
            }
            _mapper.Map(value, worker);
            worker = await _workerService.UpdateAsync(id,worker);
           
            return Ok(_mapper.Map<WorkerDto>(worker));
        }

        // DELETE api/<WorkerController>/5
        [HttpDelete("{id}")]
        public  async Task<ActionResult> Delete(int id)
        {
            var worker = await _workerService.GetByIdAsync(id);
            if (worker == null)
            {
                return NotFound();
            }
            await _workerService.DeletesAync(id);
            return  NoContent();
        }
    }
}
