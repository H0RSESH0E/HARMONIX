using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class OrganizationRepository : IOrganizationRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public OrganizationRepository(DataContext context , IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<IEnumerable<Organization>> GetOrganizationsAsync()
        {
            return await  _context.Organizations
                .Include(p => p.Photos)
                .Include(m => m.Members)
                .Include(j => j.Jobs)
                .ToListAsync();
        }

        public async Task<PagedList<OrganizationDto>> GetCompactOrganizationsAsync(OrganizationParams organizationParams)
        {
            var organizations = _context.Organizations.AsQueryable();
            var query = organizations;

            if (organizationParams.Established != null && organizationParams.Established > 0)
                query = query.Where(o => o.Established == organizationParams.Established).AsQueryable();

            query = organizationParams.OrderBy switch
            {
                "alphabetical" => query.OrderBy(o => o.Name),
                "established" => query.OrderBy(o => o.Established),
                _ => query.OrderByDescending(o => o.LikedByUser.Count)
            };

            return await PagedList<OrganizationDto>.CreateAsync(
                query.ProjectTo<OrganizationDto>(_mapper.ConfigurationProvider).AsNoTracking(),
                organizationParams.PageNumber,
                organizationParams.PageSize
            );
        }

        public async Task<Organization> GetOrganizationByIdAsync(int id)
        {
            return await _context.Organizations
                    .Include(p => p.Photos)
                    .Include(m => m.Members)
                    .Include(j => j.Jobs)
                    .SingleOrDefaultAsync(o => o.Id == id);
        }

        public async Task<OrganizationDto> GetCompactOrganizationByIdAsync(int id)
        {
            var organization = await _context.Organizations
                    .Where(o => o.Id == id)
                    .Include(p => p.Photos)
                    .Include(m => m.Members)
                    .Include(j => j.Jobs)
                    .ProjectTo<OrganizationDto>(_mapper.ConfigurationProvider)
                    .SingleOrDefaultAsync();

            return organization;
        }

        public async Task<Organization> GetOrganizationByOrgnameAsync(string orgname)
        {
            return await _context.Organizations
                    .Where(x => x.Name == orgname)
                    .Include(p => p.Photos)
                    .Include(m => m.Members)
                    .Include(j => j.Jobs)
                    .SingleOrDefaultAsync();  
                
        // ! Do not delete - we can use this for a search function
        // var organization = await _context.Organizations.Where(o=>o.Name.ToLower().Contains(orgname.ToLower())).ToListAsync();
        // return  organization;
        }        

        public async Task<bool> SaveAllAsync()
        {
            var updates = await _context.SaveChangesAsync();
            var isUpdated = updates > 0;
            
            return isUpdated;
        }


        public void Add(Organization organization)
        {
            _context.Organizations.Add(organization);
        }

        public void Update(Organization organization)
        {
            _context.Entry(organization).State = EntityState.Modified;
        }

        public async Task<PagedList<OrgMemberDto>> GetMembersByOrganizationIdAsync(UserParams userParams, int id)
        {
            var org = _context.Organizations.SingleOrDefault(o => o.Id == id);
            var query = _context.Users.Where(u => u.Affiliation.Contains(org));
            query = query.Where(u => u.UserName != userParams.CurrentUsername);

            query = userParams.OrderBy switch
            {
                "created" => query.OrderByDescending(u => u.Created),
                _ => query.OrderByDescending(u => u.LastActive)
            };

            return await PagedList<OrgMemberDto>.CreateAsync(
                    query.ProjectTo<OrgMemberDto>(_mapper.ConfigurationProvider).AsNoTracking(),
                    userParams.PageNumber,
                    userParams.PageSize
                );
        }

        public async Task<PagedList<JobDto>> GetJobsByOrganizationIdAsync(JobParams jobParams, int id)
        {
            var org = _context.Organizations.SingleOrDefault(o => o.Id == id);
            var query = _context.Jobs.Where(j => j.Organization.Equals(org));
            var emptyOrg = _context.Organizations.Take(0);

            if (query == null)
                return new PagedList<JobDto>(new List<JobDto>(), 0, jobParams.PageNumber, jobParams.PageSize);
            
            query = jobParams.OrderBy switch
            {
                "deadline" => query.OrderByDescending(u => u.Deadline),
                _ => query.OrderByDescending(u => u.LastUpdated)
            };

            query = query
                        .Include(j => j.Organization)
                        .Include(j => j.Organization.Photos)
                        .Include(j => j.JobPoster)
                        .Include(j => j.JobPoster.Photos).AsQueryable();

            return await PagedList<JobDto>.CreateAsync(
                    query.ProjectTo<JobDto>(_mapper.ConfigurationProvider).AsNoTracking(),
                    jobParams.PageNumber,
                    jobParams.PageSize
                );
        }
        public async Task<PagedList<OrganizationDto>> GetOwnedOrganizationsAsync(OrganizationParams organizationParams, int id)
        {
            var organizations = _context.Organizations.Where(o => o.OwnerId == id);
            var query = organizations;

            query = organizationParams.OrderBy switch
            {
                "alphabetical" => query.OrderBy(o => o.Name),
                "established" => query.OrderBy(o => o.Established),
                _ => query.OrderByDescending(o => o.LikedByUser.Count)
            };

            return await PagedList<OrganizationDto>.CreateAsync(
                query.ProjectTo<OrganizationDto>(_mapper.ConfigurationProvider).AsNoTracking(),
                organizationParams.PageNumber,
                organizationParams.PageSize
            );
        }

        public async Task<PagedList<OrganizationDto>> GetAffiliatedOrganizationsAsync(OrganizationParams organizationParams, int id)
        {
            var query = _context.Users.Where(u => u.Id == id).SelectMany(u => u.Affiliation).AsQueryable();

            query = organizationParams.OrderBy switch
            {
                "alphabetical" => query.OrderBy(o => o.Name),
                "established" => query.OrderBy(o => o.Established),
                _ => query.OrderByDescending(o => o.LikedByUser.Count)
            };

            return await PagedList<OrganizationDto>.CreateAsync(
                query.ProjectTo<OrganizationDto>(_mapper.ConfigurationProvider).AsNoTracking(),
                organizationParams.PageNumber,
                organizationParams.PageSize
            );
        }

        public async Task<IEnumerable<Organization>> GetOwnedOrganizationsRawAsync(int id)
        {
            return await _context.Organizations
                .Where(o => o.OwnerId == id)
                .Include(p => p.Photos)
                .Include(m => m.Members)
                .Include(j => j.Jobs)
                .ToListAsync();
        }

        public async Task<IEnumerable<string>> GetAllOrganizationNames()
        {
            return await _context.Organizations
                .Select(o => o.Name)
                .ToListAsync();
        }

        public bool DeleteOrganizationById(int id)
        {
            var organization = _context.Organizations.Where(o => o.Id == id).SingleOrDefault();

            var IsExisted = organization != null;

            if (IsExisted)
            {
                _context.Organizations.Remove(organization);
            }

            return IsExisted;
        }
    }
}