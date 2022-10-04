using API.Entities;
using API.DTOs;
using API.Helpers;


namespace API.Interfaces
{
    public interface IOrgLikesRepository
    {
        Task<OrgLike> GetOrganizationLike(int OrgId, int likedUserId);
        Task<Organization> GetOrganizationWithLikes(int orgId);

        Task<IEnumerable<OrgLikeDto>> GetOrganizationLikes( int orgId);
    }
}