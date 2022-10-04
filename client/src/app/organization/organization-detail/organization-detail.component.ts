import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { Organization } from 'src/app/_models/organization';
import { Pagination } from 'src/app/_models/pagination';
import { UserParams } from 'src/app/_models/userParams';
import { MembersService } from 'src/app/_services/members.service';
import { OrganizationsService } from 'src/app/_services/organizations.service';

@Component({
  selector: 'app-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.css']
})
export class OrganizationDetailComponent implements OnInit {
  organization: Organization;
  member: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private route: ActivatedRoute, private memberService: MembersService, private router: Router, private orgsService: OrganizationsService ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  ngOnInit(): void {
    this.loadOrganization();
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ]



  }

  loadOrganization(){
    this.orgsService.getOrganization(Number(this.route.snapshot.paramMap.get('id'))).subscribe(
      org =>{
        this.organization = org;
        this.galleryImages = this.getImages(org);
        //this.loadOrg(job.orgId);
        //this.loadMember(job.jobPosterName)
      }
    )
  }

  getImages(org: Organization): NgxGalleryImage[] {
    const imageUrls = [];
    for (const photo of this.organization.photos) {
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      })
    }
    return imageUrls;
  }


  addLike(organization: Organization) {
    //this.toastr.success('You have liked ');
    //add addLike method in organization service
    // this.memberService.addLike(member.username).subscribe(() => {
    //   this.toastr.success('You have liked ' + member.knownAs);
    // })
  }

}
