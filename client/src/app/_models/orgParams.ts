export class OrgParams {
  orgType: string; // --> Added to backend, - Nathan
  pageNumber = 1;
  pageSize = 5;
  city: string;
  provinceOrState: string;
  country: string;
  orderBy = 'mostRecent'; 
  // orderBy = 'likes'; // Uncomment after deleting line 8
  // Other sorting options from Backend:
  // 'alphabetical' - ascending
  // 'established' - descending

  constructor() {}
}