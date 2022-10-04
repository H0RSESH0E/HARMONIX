using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class JobsController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IJobRepository _jobRepository;
        private readonly IMapper _mapper;
        private readonly IOrganizationRepository _organizationRepository;

        public JobsController(IUserRepository userRepository, IJobRepository jobRepository, IOrganizationRepository organizationRepository, IMapper mapper)
        {
            _organizationRepository = organizationRepository;
            _jobRepository = jobRepository;
            _mapper = mapper;
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobDto>>> GetJobs([FromQuery] JobParams jobParams)
        {
            var jobs = await _jobRepository.GetJobsAsync(jobParams);

            Response.AddPaginationHeader(jobs.CurrentPage, jobs.PageSize,
                jobs.TotalCount, jobs.TotalPages);

            return Ok(jobs);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<JobDto>> GetJobById(int id)
        {
            var job = await _jobRepository.GetJobByIdAsync(id);
            return _mapper.Map<JobDto>(job);
        }

        [HttpGet("title/{title}")]
        public async Task<ActionResult<IEnumerable<JobDto>>> GetJobsByTitle([FromQuery] JobParams jobParams, string title)
        {
            var jobs = await _jobRepository.GetJobsByTitleAsync(jobParams, title);

            Response.AddPaginationHeader(jobs.CurrentPage, jobs.PageSize,
                jobs.TotalCount, jobs.TotalPages);

            return Ok(jobs);
        }

        [HttpGet("poster/{id}")]
        public async Task<ActionResult<IEnumerable<JobDto>>> GetJobsByPosterId([FromQuery] JobParams jobParams, int id)
        {
            var jobs = await _jobRepository.GetJobsByPosterIdAsync(jobParams, id);

            Response.AddPaginationHeader(jobs.CurrentPage, jobs.PageSize,
                jobs.TotalCount, jobs.TotalPages);

            return Ok(jobs);
        }

        //Update existing Job
        [Authorize(Policy = "RequireForteMembershipRole")]
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateJob(JobUpdateDto jobUpdateDto, int id)
        {
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());
            var job = await _jobRepository.GetJobByIdAsync(id);

            if (job.JobPoster.Id != user.Id) return BadRequest("You are not permitted to perform this action. Nice try ;)");

            if (job.JobPoster != user) return BadRequest("Job Not Found");

            _mapper.Map(jobUpdateDto, job);

            _jobRepository.Update(job);
            if (await _jobRepository.SaveAllAsync())
                return NoContent();

            return BadRequest("Failed to update user");
        }

        // Add a new Job
        [Authorize(Policy = "RequireForteMembershipRole")]
        [HttpPost("add")]
        public async Task<ActionResult<JobRegisterDto>> AddNewJobByPosterId(JobRegisterDto jobRegisterDto)
        {
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());
            var id = jobRegisterDto.ConfirmedOrgId;
            var org = await _organizationRepository.GetOrganizationByIdAsync(id);
            var job = _mapper.Map<Job>(jobRegisterDto);

            if (org != null && user != null)
            {
                if (user.Affiliation != null && !user.Affiliation.Contains(org))
                    return BadRequest("You cannot post a job if you are not part of the organization.");

                job.JobPoster = user;
                job.Organization = org;

                _jobRepository.Add(job);
                if (await _jobRepository.SaveAllAsync())
                    return NoContent();
            }

            return BadRequest("Failed to add job");
        }

        //Delete a Job
        [Authorize(Policy = "RequireForteMembershipRole")]
        [HttpDelete("delete/{id}")]
        public async Task<ActionResult> DeleteJob(int id)
        {
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

            var job = user.CreatedJobs.FirstOrDefault(x => x.Id == id);

            if (job.JobPoster.Id != user.Id) return BadRequest("You are not permitted to perform this action. Nice try ;)");

            if (job == null || user == null) return NotFound();

            user.CreatedJobs.Remove(job);

            if (await _userRepository.SaveAllAsync()) return Ok();

            return BadRequest("Failed to delete the photo");
        }

    }
}