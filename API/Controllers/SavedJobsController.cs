using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class SavedJobsController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly ISavedJobsRepository _savedJobsRepository;
        private readonly IJobRepository _jobRepository;
        public SavedJobsController(IUserRepository userRepository, ISavedJobsRepository savedJobsRepository, IJobRepository jobRepository)
        {
            _savedJobsRepository = savedJobsRepository;
            _userRepository = userRepository;
            _jobRepository = jobRepository;
        }

        [HttpPost("{id}")]
        public async Task<ActionResult> SaveJob(int id)
        {
            var sourceUserId = User.GetUserId();
            var savedJob = await _jobRepository.GetJobByIdAsync(id);

            var sourceUser = await _savedJobsRepository.GetUserWithSavedJobs(sourceUserId);

            if (savedJob == null) return NotFound();

            var jobSave = await _savedJobsRepository.GetJobSave(sourceUserId, savedJob.Id);

            if (jobSave != null) return BadRequest("You already save this job");

            jobSave = new JobSave
            {
                SourceUserId = sourceUserId,
                SavedJobId = savedJob.Id
            };

            sourceUser.SavedJobs.Add(jobSave);

            if (await _jobRepository.SaveAllAsync())
            {
                return Ok();
            }

            return BadRequest("Failed to Save Job");

        }

        [HttpDelete("delete-savedJob/{id}")]
        public async Task<ActionResult> RemoveSavedJob(int id)
        {
            var sourceUserId = User.GetUserId();
            var savedJob = await _jobRepository.GetJobByIdAsync(id);

            var sourceUser = await _savedJobsRepository.GetUserWithSavedJobs(sourceUserId);

            if (savedJob == null) return NotFound();

            var jobSave = await _savedJobsRepository.GetJobSave(sourceUserId, savedJob.Id);

            if (jobSave == null) return BadRequest("You already removed this job");

            
            sourceUser.SavedJobs.Remove(jobSave);

            if (await _jobRepository.SaveAllAsync())
            {
                return Ok();
            }

            return BadRequest("Failed to remove Job");

        }
        


        [HttpGet]
        public async Task<ActionResult<IEnumerable<SavedjobDto>>> GetUserSavedjobs([FromQuery]SavedJobsParams savedJobsParams)
        {
            savedJobsParams.UserId = User.GetUserId();
            var jobs = await _savedJobsRepository.GetUserSavedjobs(savedJobsParams);

            Response.AddPaginationHeader(jobs.CurrentPage, jobs.PageSize, jobs.TotalCount, jobs.TotalPages);
            return Ok(jobs);
        }

    }
}