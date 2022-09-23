export interface Job {
    id: number
    title: string
    organization: string //organization interface?
    jobPosterId: number //appuser interface?
    logo: string //photo interface?
    description: string
    salary: number
    city: string
    provinceOrState: string
    country: string
    genre: string[]
    jobType: string
    skillsRequired: string[]
    applicationURL: string
    dateCreated: Date
    deadline: Date
    lastUpdated: Date
}