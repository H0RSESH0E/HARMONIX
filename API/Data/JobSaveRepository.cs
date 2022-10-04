using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
  public class JobSaveRepository : IJobSaveRepository
  {
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    public JobSaveRepository(DataContext context, IMapper mapper){
        _context = context;
        _mapper = mapper;

    }
    public async Task<JobSave> GetSavedJob(int savedUserId, int jobId)
    {
        return await _context.SavedJobs.FindAsync(jobId,savedUserId);
    }

    //list of jobs that the user has saved
    public async Task<List<JobSaveDto>> GetSavedJobs(string predicate, int userId)
    {
     // var users = _context.Users.OrderBy(u => u.UserName).AsQueryable();
      var jobs = _context.Jobs.AsQueryable();
      var savedjobs = _context.SavedJobs.AsQueryable();

      //list of jobs currently logged in user has saved
      if (predicate == "saved") 
      {
        savedjobs = savedjobs.Where(user => user.SavedUserId == userId);
        jobs = savedjobs.Select(save => save.SavedJob);
      }

    //   if (predicate == "savedBy")
    //   {
        
    //     savedjobs = savedjobs.Where(job => job.JobId == userId);
    //     users = savedjobs.Select(save => save.SavedUser);
    //  //   jobs = savedjobs.Where(job => job.JobId == userId)
    //   }

      return await  jobs.Select(job=> new JobSaveDto{
        JobId=job.Id,
        Title=job.Title,
        OrgId = job.Organization.Id,
        JobPosterId = job.JobPoster.Id,
        JobPosterName = job.JobPoster.UserName,
        LogoUrl = job.Organization.Photos != null || job.Organization != null 
          ? job.Organization.Photos.FirstOrDefault(x => x.IsMain).Url
          : job.JobPoster.Photos.FirstOrDefault(x => x.IsMain).Url,
        Description=job.Description,
        Salary=job.Salary,
        City=job.City,
        ProvinceOrState=job.ProvinceOrState,
        Country=job.Country,
        Genres=job.Genres,
        JobType=job.JobType,
        SkillsRequired=job.SkillsRequired,
        ApplicationUrl=job.ApplicationUrl,
        DateCreated=job.DateCreated,
        Deadline=job.Deadline,
        LastUpdated=job.LastUpdated
      }).ToListAsync();
      
    }

    //list of jobs that a user has saved
    public async Task<AppUser> GetUserWithSavedJobs(int userId)
    {
      var jobs =  await _context.Users.Where(i=>i.Id == userId)
      .Include(x=>x.SavedJobs).FirstOrDefaultAsync();

      return jobs;
    }
  }
}