import { Job } from "./job";
import { Photo } from "./photo";

export interface OrgMember {
  id: number;
  username: string; // changes required to remove
  photoUrl: string;
  age: number;
  knownAs: string;
  created: Date;
  lastActive: Date;
  gender: string;
  introduction: string; // changes required to remove
  lookingFor: string; // changes required to remove
  interests: string; // changes required to remove
  city: string;
  provinceOrState: string;
  country: string;
  photos: Photo[];
  createdJobs: Job[];
}