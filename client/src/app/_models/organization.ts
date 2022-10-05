import { Job } from "./job"
import { Member } from "./member"
import { OrgMember } from "./orgMember";
import { Photo } from "./photo"

export interface Organization {
  id: number;
  ownerId: number;
  name: string;
  introduction: string;
  photoUrl: string;
  established: number;
  likes: number;
  city: string;
  provinceOrState: string;
  country: string;
  created: Date;
  lastUpdated: Date;
  //Maybe implement in next sprint
  //jobs: Job[]
  // --> Nathan: jobs: Job[] is part of the GET response,
  // --> Please feel free to implement and uncomment jobs property
  //
  // backend returns memebers who liked the org
  // --> Nathan: OK, for the next sprint. I am not even aware of this feature on LinkedIn.
  photos: Photo[];
  members: Member[]; // !Possible cycle detexcion -> Pls feel free to delete (and let Nathan or Tyler know so the DTO gets updated).
  // !We can call GET '/api/organizations/{id}/users' instead.
  // members: OrgMember[]; // Uncomment for the alternative
  // For the above solution, please change all <Member> for Organization.service.ts to <orgMember>
}