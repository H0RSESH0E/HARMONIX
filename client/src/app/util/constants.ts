export interface Gender {
    value: string;
    display: string;
}
export const GENDER_LIST : Gender[] = [
  {
    value: 'male',
    display: 'Males',
  },
  {
    value: 'female',
    display: 'Females',
  },
  {
    value: 'nonbinary',
    display: 'Non-Binary',
  },
  {
    value: 'unidentified',
    display: 'Unidentified',
  },
  {
    value: 'other',
    display: 'Other',
  },
];