using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class JobSave
    {
        public AppUser SourceUser { get; set; } //user that liking other user

        public int SourceUserId { get; set; }

        public Job SavedJob { get; set; }

        public int SavedJobId { get; set; }
    }
}