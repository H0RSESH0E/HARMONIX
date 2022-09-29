using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class SavedJobsRepository : ISavedJobsRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public SavedJobsRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task<JobSave> GetJobSave(int sourceUserId, int savedJobId)
        {
            return await _context.SavedJobs.FindAsync(sourceUserId, savedJobId);
        }

        public async Task<PagedList<SavedjobDto>> GetUserSavedjobs(SavedJobsParams savedJobsParams)
        {
            var savedJobs = _context.SavedJobs.AsQueryable();
            var jobs = _context.Jobs.OrderBy(u => u.Deadline).AsQueryable();

            if (savedJobsParams.Predicate == "savedJob")
            {
                savedJobs = savedJobs.Where(save => save.SourceUserId == savedJobsParams.UserId);
                jobs = savedJobs.Select(save => save.SavedJob);
            }

            // if (predicate == "savedJobBy")
            // {
            //     savedJobs = savedJobs.Where(save => save.SavedJobId == userId);
            //     jobs = savedJobs.Select(save => save.SourceUser);
            // }

            var savedJobsResponse =  jobs.Select(job => new SavedjobDto
            {
                Id = job.Id,
                Title = job.Title,
                OrgId = job.OrgId,
                JobPosterName = job.JobPosterName,
                LogoUrl = job.LogoUrl,
                Description = job.Description,
                Salary = job.Salary,
                City = job.City,
                ProvinceOrState = job.ProvinceOrState,
                Country = job.Country,
                Genres = job.Genres,
                JobType = job.JobType,
                SkillsRequired = job.SkillsRequired,
                ApplicationUrl = job.ApplicationUrl,
                DateCreated = job.DateCreated,
                Deadline = job.Deadline,
                LastUpdated = job.LastUpdated,
            });

            return await PagedList<SavedjobDto>.CreateAsync(savedJobsResponse, savedJobsParams.PageNumber, savedJobsParams.PageSize);
        }

        public async Task<AppUser> GetUserWithSavedJobs(int userId)
        {
            return await _context.Users.Include(x => x.SavedJobs).FirstOrDefaultAsync(x => x.Id == userId); //check function for this
                                                                                                            // Users = SavedJob                                                                                                //change AppUser to JobSave
        }
    }
}