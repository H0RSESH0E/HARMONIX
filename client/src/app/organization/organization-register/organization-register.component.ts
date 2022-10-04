import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrganizationsService } from 'src/app/_services/organizations.service';

@Component({
  selector: 'app-organization-register',
  templateUrl: './organization-register.component.html',
  styleUrls: ['./organization-register.component.css']
})
export class OrganizationRegisterComponent implements OnInit {
  organization: any;
  @ViewChild('editForm') editForm: NgForm;
  addOrganizationForm: FormGroup;
  validationErrors: string[] = [];
  
  constructor(private organizationService: OrganizationsService, private toastr: ToastrService, private fb: FormBuilder,private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadOrganization();
  }

  initializeForm(){
    this.addOrganizationForm = this.fb.group({
      name: ['', Validators.required],
      established: [0],
      city: [''],
      provinceOrState: [''],
      country: [''],
      introduction: [''],
      photos: []
    });

  }

  loadOrganization(){
    this.organization = {
      knownAs: "Test Job Title",
      introduction: "test intro",
      interests: "test interests",
      lookingFor: "test looking for",
      city: "test city",
      provinceOrState: "test province",
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
      photos: [],
    };
  }

  addOrganization() {
    this.organizationService.registerOrganization(this.addOrganizationForm.value).subscribe(res => {
      this.router.navigateByUrl('/organizations');
      this.toastr.success("Organization addedd successfully!")
    }, error => {
      console.log(error);
      this.validationErrors = error;
    })
  }

  cancel() {
    this.router.navigateByUrl('/organizations');
  }

}
