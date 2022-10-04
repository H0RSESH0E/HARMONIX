using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IOrganizationRepository
    {

    void Update(Organization organization);
    void Add(Organization organization);
    Task<bool> SaveAllAsync();

    Task<IEnumerable<String>> GetAllOrganizationNames();
    Task<IEnumerable<Organization>> GetOrganizationsAsync();
    Task<PagedList<OrganizationDto>> GetCompactOrganizationsAsync(OrganizationParams organizationParams);
    Task<PagedList<OrganizationDto>> GetOwnedOrganizationsAsync(OrganizationParams organizationParams, int id);
    Task<IEnumerable<Organization>> GetOwnedOrganizationsRawAsync(int id);
    Task<PagedList<OrganizationDto>> GetAffiliatedOrganizationsAsync(OrganizationParams organizationParams, int id);
    Task<Organization> GetOrganizationByOrgnameAsync(string orgname);
    Task<Organization> GetOrganizationByIdAsync(int id);
    Task<OrganizationDto> GetCompactOrganizationByIdAsync(int id);
    Task<PagedList<OrgMemberDto>> GetMembersByOrganizationIdAsync(UserParams userParams, int id);
    Task<PagedList<JobDto>> GetJobsByOrganizationIdAsync(JobParams jobParams, int id);
    }
}