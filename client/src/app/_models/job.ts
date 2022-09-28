import { AppUser } from "./AppUser"
import { Organization } from "./organization"
import { Photo } from "./photo"

export interface Job {
    id: number
    title: string
    organization: Organization //organization interface?
    orgId: number
    jobPoster: AppUser
    jobPosterId: number //appuser interface?
    logo?: Photo //photo interface?
    description: string
    salary: number
    city: string
    provinceOrState: string
    country: string
    genre: string
    jobType: string
    skillsRequired: string
    applicationURL: string
    dateCreated: Date
    deadline: Date
    lastUpdated: Date
}