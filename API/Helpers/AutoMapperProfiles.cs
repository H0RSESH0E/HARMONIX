using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>()
              .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src =>
                src.Photos.FirstOrDefault(x => x.IsMain).Url))
              .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()))
              .ForMember(dest => dest.Genres, opt => opt.MapFrom(src => src.Genres == null ? new() : src.Genres
                    .Replace(" ", "")
                    .Split(',', System.StringSplitOptions.None)
                    .ToList()))
              .ForMember(dest => dest.Skills, opt => opt.MapFrom(src => src.Skills == null ? new() : src.Skills
                    .Replace(" ", "")
                    .Split(',', System.StringSplitOptions.None)
                    .ToList()));
            CreateMap<Photo, PhotoDto>();
            CreateMap<MemberUpdateDto, AppUser>();
            CreateMap<RegisterDto, AppUser>();
            CreateMap<Message, MessageDto>()
                .ForMember(dest => dest.SenderPhotoUrl, opt => opt.MapFrom(src =>
                    src.Sender.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.RecipientPhotoUrl, opt => opt.MapFrom(src =>
                    src.Recipient.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<DateTime, DateTime>().ConvertUsing(d => DateTime.SpecifyKind(d, DateTimeKind.Utc));
            CreateMap<Job, JobDto>()
             .ForMember(dest => dest.JobPosterId, opt => opt.MapFrom(src =>
             src.JobPoster.Id))
             .ForMember(dest => dest.JobPosterName, opt => opt.MapFrom( src =>
             src.JobPoster.KnownAs));
            CreateMap<JobUpdateDto, Job>();
            CreateMap<JobDto, Job>();
            CreateMap<JobSave, JobSaveDto>()
            //  .ForMember(dest => dest.JobId, opt => opt.MapFrom(src =>
            //     src.SavedJob.Id))
             .ForMember(dest => dest.Title, opt => opt.MapFrom(src =>
                src.SavedJob.Title))
             .ForMember(dest => dest.OrgId, opt => opt.MapFrom(src =>
                src.SavedJob.OrgId))
             .ForMember(dest => dest.JobPosterId, opt => opt.MapFrom(src =>
                src.SavedJob.JobPoster.Id))
             .ForMember(dest => dest.JobPosterName, opt => opt.MapFrom(src =>
                src.SavedJob.JobPoster.KnownAs))
             .ForMember(dest => dest.LogoUrl, opt => opt.MapFrom(src =>
                src.SavedJob.JobPoster.Photos.FirstOrDefault(x => x.IsMain).Url))
             .ForMember(dest => dest.Description, opt => opt.MapFrom(src =>
                src.SavedJob.Description))
             .ForMember(dest => dest.Salary, opt => opt.MapFrom(src =>
                src.SavedJob.Salary))
             .ForMember(dest => dest.City, opt => opt.MapFrom(src =>
                src.SavedJob.City))
             .ForMember(dest => dest.ProvinceOrState, opt => opt.MapFrom(src =>
                src.SavedJob.ProvinceOrState))
             .ForMember(dest => dest.Country, opt => opt.MapFrom(src =>
                src.SavedJob.Country))
             .ForMember(dest => dest.Genres, opt => opt.MapFrom(src =>
                src.SavedJob.Genres))
             .ForMember(dest => dest.JobType, opt => opt.MapFrom(src =>
                src.SavedJob.JobType))
             .ForMember(dest => dest.SkillsRequired, opt => opt.MapFrom(src =>
                src.SavedJob.SkillsRequired))
             .ForMember(dest => dest.ApplicationUrl, opt => opt.MapFrom(src =>
                src.SavedJob.ApplicationUrl))
             .ForMember(dest => dest.DateCreated, opt => opt.MapFrom(src =>
                src.SavedJob.DateCreated))
             .ForMember(dest => dest.Deadline, opt => opt.MapFrom(src =>
                src.SavedJob.Deadline))
             .ForMember(dest => dest.LastUpdated, opt => opt.MapFrom(src =>
                src.SavedJob.LastUpdated));
        }
    }
}