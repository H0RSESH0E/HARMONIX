import { AppUser } from "./AppUser"
import { Job } from "./job"
import { Photo } from "./photo"

export interface Organization {
    id: number
    name: string
    introduction: string
    established: number
    created: Date
    lastUpdated: Date
    members: AppUser[]
    jobs: Job[]
    likedByUser: AppUser[]
    photo: Photo[]
}