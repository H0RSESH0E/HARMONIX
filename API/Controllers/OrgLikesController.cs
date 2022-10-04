using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers

{
    public class OrgLikesController : BaseApiController
    {
        private readonly IOrgLikesRepository _orgLikesRepository;
        private readonly IOrganizationRepository _organizationRepository;
        private readonly IUserRepository _userRepository;

        public OrgLikesController(IOrganizationRepository organizationRepository, IOrgLikesRepository orgLikesRepository,
                                    IUserRepository userRepository)
        {
            _userRepository = userRepository;
            _organizationRepository = organizationRepository;
            _orgLikesRepository = orgLikesRepository;
        }

        [HttpPost("{id}")]
        public async Task<ActionResult> AddLike( int id )
        {
            var userId = User.GetUserId();
            var user = await _userRepository.GetUserByIdAsync(userId);
            var organization= await _orgLikesRepository.GetOrganizationWithLikes(id);

            if (user == null) return NotFound();
            var orgLike = await _orgLikesRepository.GetOrganizationLike(id, user.Id);

            if (orgLike != null) return BadRequest("You already like this user");

            orgLike = new OrgLike
            {
                OrgId = id,
                LikedUserId = user.Id
            };

            organization.LikedOrganizations.Add(orgLike);

            if (await _organizationRepository.SaveAllAsync()) return Ok();

            return BadRequest("Failed to like this organization");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrgLikeDto>>> GetOrganizationLikes(int id )
            {

                return Ok (await _orgLikesRepository.GetOrganizationLikes(id));
                
        }

    }
}