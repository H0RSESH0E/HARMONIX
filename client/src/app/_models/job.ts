
export interface Job {
    id: number,
    title: string;
    orgId: number;
    jobPosterName?: string;
    jobPosterId: number;
    logoUrl: string;
    description: string;
    salary: number;
    city: string;
    provinceOrState: string;
    country: string;
    genres: string;
    jobType: string;
    skillsRequired: string;
    applicationUrl: string;
    dateCreated: string;
    deadline: string;
    lastUpdated: string;
}



