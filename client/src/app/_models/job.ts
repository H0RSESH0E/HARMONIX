import { Photo } from "./photo"
import { User } from "./user"

export interface Job {
    id: number
    title: string
    //Ogranization which posted this job
    //dependant on cap72
    confirmedOrgId: number
    jobPosterId: number
    jobPosterName: string
    logoUrl: string
    description: string
    salary: number
    city: string
    provinceOrState: string
    country: string
    genres: string
    jobType: string
    skillsRequired: string
    applicationUrl: string
    dateCreated: Date
    deadline: Date
    lastUpdated: Date




  }