using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IJobSaveRepository
    {
        //specific saved job
        Task<JobSave> GetSavedJob(int savedUserId, int jobId);

        //list of saved job that the user has saved
        Task<AppUser> GetUserWithSavedJobs(int userId);

        Task<PagedList<JobSaveDto>>  GetSavedJobs(JobParams jobParams, int userId);

        
    }
}