import { Job } from './job';
import { Member } from './member';
import { OrgMember } from './orgMember';
import { Photo } from './photo';

export interface Affiliation {
  id: number;
  name: string;
  introduction: string;
  photoUrl: string;
  membersCount: number;
  likes: number;
  established: number;
}
