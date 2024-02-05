import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  
  userArray : any | [];
  newUserModal = true;
  isEdit = false;
  staffFormGroup! : FormGroup;

  constructor(private userService : UserService, private router : Router, private formBuilder: FormBuilder, private toastr: ToastrService, private cd: ChangeDetectorRef ){

  }

  ngOnInit() {
    this.getUsers();
    this.staffFormGroup = this.formBuilder.group({
      fullname: ['', Validators.required],
      mobileno: ['', Validators.required],
      emailid: ['', Validators.required],
      address: ['', Validators.required],
      role: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]

    });
  }

  getUsers() {
    this.userService.getAllUsers().subscribe(data => {
      this.userArray = data;
    });
    
  console.log("Printing user array : ", this.userArray);

  }

  keyPressAlphaNumeric(event: any) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  newUser(){
  // stop here if form is invalid
  if (this.staffFormGroup.invalid) {
    return;
  }

  this.userService.adduser(this.staffFormGroup.value).subscribe(
    data => {
      this.staffFormGroup.reset();
      this.getUsers();
      this.toastr.success("User Add Successful");
    },
    error => {
      this.toastr.error(error);
    }
  )
  }

  updateUser(userId : any){
    
  }

  deleteUser(userId : any){
    Swal.fire({
      title: 'Do you want to delete user?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(userId).subscribe(
        data => {
          this.toastr.success(data.message);
          this.getUsers();
          this.cd.detectChanges();
        }, error => {
          this.toastr.error(error);
          this.getUsers();
        })
      } else if (result.isDenied){
        Swal.fire('User not deleted', '', 'info')
      }

    });
    this.getUsers();
  }
  newUserModalAdd(){
    this.newUserModal = true;
    console.log("Calling newUserModal method");
    this.getUsers();    
  }

}
