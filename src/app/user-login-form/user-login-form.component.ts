import { Component, Input, OnInit } from '@angular/core';
// Used to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls created in fetch-api-data.service.ts
import { UserLoginService } from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: UserLoginService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router //cannot use 'this.router...' below without this line
  ) { }

  ngOnInit(): void {
  }

  /**
   * This is the function responsible for sending the form inputs to the backend and routing the user to the 'movie-card' view after login
   */
  userLogin(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      // logic for a successful user registration goes here!
      this.dialogRef.close(); // this will close the modal on success
      console.log(response);
      localStorage.setItem('user', response.user.Username);
      localStorage.setItem('token', response.token);
      this.snackBar.open('User logged in successfully!', 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies']);
    }, (response) => {
      console.log(response);
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }
}