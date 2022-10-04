namespace API.DTOs
{
    public class OrgLikeDto
    {
        public int OrgId { get; set; }
        public string Name { get; set; }
        public string Introduction { get; set; }
        public string PhotoUrl { get; set; }
        public int Established { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime LastUpdated { get; set; } = DateTime.Now;
        public string City { get; set; }
        public string ProvinceOrState { get; set; }
        public string Country { get; set; }

    }
}
