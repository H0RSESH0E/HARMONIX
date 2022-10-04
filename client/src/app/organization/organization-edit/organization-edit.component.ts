import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OrganizationsService } from 'src/app/_services/organizations.service';

@Component({
  selector: 'app-organization-edit',
  templateUrl: './organization-edit.component.html',
  styleUrls: ['./organization-edit.component.css']
})
export class OrganizationEditComponent implements OnInit {
  organization: any;
  @ViewChild('editForm') editForm: NgForm;

  constructor(private organizationService: OrganizationsService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadOrganization();
  }

  loadOrganization(){
    this.organization = {
      knownAs: "Test Job Title",
      introduction: "test intro",
      interests: "test interests",
      lookingFor: "test looking for",
      city: "test city",
      province: "test province",
      country: "test country",
      name: "Test organization Name",
      likes: 10,
      members: [
        {

        },
        {

        },{},{}
      ],
      established: "2015",
      about: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      photos: this.getDummyImages(),
    };
  }

  getDummyImages(){
    var images = [];
    images.push({
      isMain: true,
      url: 'https://i.picsum.photos/id/988/200/200.jpg?hmac=-lwK-i6PssD9WlUeVPDIhOxDVxlzJKeM4MgEx_fIqJg'
    });
    images.push({
      isMain: false,
      url: 'https://i.picsum.photos/id/367/200/200.jpg?hmac=6NmiWxiENMBIeAXEfu9fN20uigiBudgYzqHfz-eXZYk'
    });
    images.push({
      isMain: false,
      url: 'https://i.picsum.photos/id/214/200/200.jpg?hmac=hcznBngs7e7PmNwXcM4UioAhb1oOUpfGDzBM-qSgpp4'
    });
    return images;
  }

  updateOrganization(){
    console.log("update organization");
    this.organizationService.updateOrganization(this.organization).subscribe(() => {
      this.toastr.success('Profile updated successfully');
      this.editForm.reset(this.organization);
    })
  }

}
