using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
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
            return await _context.Organizations
                    .Include(p => p.Photos)
                    .Include(m => m.Members)
                    .Include(j => j.Jobs)
                    .ProjectTo<OrganizationDto>(_mapper.ConfigurationProvider)
                    .SingleOrDefaultAsync(o => o.Id == id);
        }

        public async Task<Organization> GetOrganizationByOrgnameAsync(string orgname)
        {
            return await _context.Organizations
                    .Include(p => p.Photos)
                    .Include(m => m.Members)
                    .Include(j => j.Jobs)
                    .SingleOrDefaultAsync(x => x.Name == orgname);  
                
        // ! Do not delete - we can use this for a search function
        // var organization = await _context.Organizations.Where(o=>o.Name.ToLower().Contains(orgname.ToLower())).ToListAsync();
        // return  organization;
        }        

        public async Task<bool> SaveAllAsync()
        {
        return await _context.SaveChangesAsync() > 0;
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

            query = jobParams.OrderBy switch
            {
                "deadline" => query.OrderByDescending(u => u.Deadline),
                _ => query.OrderByDescending(u => u.LastUpdated)
            };

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
    }
}