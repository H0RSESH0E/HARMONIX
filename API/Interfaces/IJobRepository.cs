using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IJobRepository
    {
        void Update(Job job);
        void Add(Job job);
		Task<bool> SaveAllAsync();
		Task<PagedList<JobDto>> GetJobsAsync(JobParams jobParams);
		Task<Job> GetJobByIdAsync(int id);
        Task<PagedList<JobDto>> GetJobsByTitleAsync(JobParams jobParams, string title);
        Task<PagedList<JobDto>> GetJobsByPosterIdAsync(JobParams jobParams, int id);
        Task<PagedList<JobDto>> GetMemberJobsAsync(JobParams jobParams);
        Task<JobDto> GetMemberJobAsync();
        Task<AppUser> GetUserByUsernameAsync(string username);
    }
}