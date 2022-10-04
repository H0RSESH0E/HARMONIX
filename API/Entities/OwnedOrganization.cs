namespace API.Entities
{
    public class OwnedOrganization
    {
        public int Id { get; set; }
        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
        public Organization Organization { get; set; }
        public int OrganizationId { get; set; }
    }
}