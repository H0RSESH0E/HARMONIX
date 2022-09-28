using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ISavedJobsRepository
    {
        //Repo has three methods
        //indivisual like
        //to get a user with thier likes and include them
        //to go and get the likes for a user wherther the users have liked or who will have been liked by

        Task<JobSave> GetJobSave(int sourceUserId, int savedJobId);

        Task<AppUser> GetUserWithSavedJobs(int userId);

        Task<PagedList<SavedjobDto>> GetUserSavedjobs(SavedJobsParams savedJobsParams);



    }
}