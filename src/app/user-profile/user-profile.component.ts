import { Component, OnInit } from '@angular/core';
import {
  GetUserService,
  GetAllMoviesService,
  // DeletefavoriteMovieService,
  DeleteUserService
} from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserProfileComponent } from '../update-user-profile/update-user-profile.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  movies: any = [];
  favorites: any = [];

  constructor(
    public fetchApiData: GetUserService,
    public fetchApiData2: GetAllMoviesService,
    // public fetchApiData3: DeletefavoriteMovieService,
    public fetchApiData4: DeleteUserService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) { }

  /**
  * Runs the getUser() function on initialization
  */
  ngOnInit(): void {
    this.getUser();
  }

  /**
  * Gets the user's data from the database
  */
  getUser(): void {
    this.fetchApiData.getUser(localStorage.getItem('user')).subscribe((resp: any) => {
      this.user = resp;
      console.log(resp);
      this.getMovies();
    });
  }

  /**
   * Returns a list of all movies from the database and calls the filterfavorites() function
   */
  getMovies(): void {
    this.fetchApiData2.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.filterfavorites();
    });
  }

  /**
   * Filters the list of all movies into an array that matches user favorites
   * @ returns { array }
   */
  filterfavorites(): void {
    this.favorites = []; // set default empty array
    if (this.user.FavoriteMovies) {
      // this.movies.forEach((movie: any) => {
      //   if (this.user.FavoriteMovies.includes(movie._id)){
      //     this.favorites.push(movie);
      //     }
      //   }
      // );

      this.favorites = this.movies.filter((movie: any) => this.user.FavoriteMovies.includes(movie._id));
    }

    return this.favorites;
  }

  /**
  * Removes movie(s) from the users favorites list and refreshes the window automatically to show changes
  * @param id
  * @param title
  */
  // removeFromFavorites(id: string, title: string): void {
  //   this.fetchApiData3.deletefavoriteMovie().subscribe(() => {
  //     this.snackBar.open(
  //       `${title} has been removed from your Favorites`, 'OK', {
  //       duration: 2000,
  //     }
  //     );
  //     setTimeout(function () {
  //       window.location.reload();
  //     }, 1000);
  //   });
  // }


  /**
   * Opens the dialog to update a user's profile
   */
  openUpdateProfileDialog(): void {
    this.dialog.open(UpdateUserProfileComponent, {
      width: '280px',
    });
  }

  /**
  * This will delete the user's profile after confirming
  */
  deleteProfile(): void {
    let ok = confirm('Are you sure you want to delete your profile ?\nThis action cannot be undone.');
    if (ok) {
      this.fetchApiData4.deleteUser().subscribe(() => {
        localStorage.clear();
        this.router.navigate(['welcome']); // routes to the ???welcome??? view
        this.snackBar.open('Profile Deleted', 'OK', {
          duration: 2000,
        });
      });
    } else {
      window.location.reload();
    }
  }
}
