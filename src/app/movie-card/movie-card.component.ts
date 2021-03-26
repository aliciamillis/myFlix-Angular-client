import { Component, OnInit } from '@angular/core';
import { GetAllMoviesService, AddFavouriteMovieService, DeleteFavouriteMovieService } from '../fetch-api-data.service';
import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  constructor(
    public fetchApiData: GetAllMoviesService,
    public fetchApiData2: AddFavouriteMovieService,
    public fetchApiData3: DeleteFavouriteMovieService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public buttonModule: MatButtonModule
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  //get list of movies 
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Opens a dialog box with a description of the movie's director
   * @param director
   * @param bio 
   * @param birth 
   * @param death 
   */
  showDirectorDialog(director: string, bio: string, birth: Date, death: Date): void {
    this.dialog.open(DirectorDialogComponent, {
      data: { director, bio, birth, death },
      width: '350px',
    });
  }

  /**
   * Opens a dialog box with a description of the movie's genre
   * @param name 
   * @param description 
   */
  showGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreDialogComponent, {
      data: { name, description },
      width: '350px',
    });
  }

  /**
   * Opens a dialog box with all available details of the movie
   * @param title 
   * @param imagepath 
   * @param description 
   * @param director 
   * @param genre 
   */
  showDetailsDialog(title: string, imagepath: string, description: string, director: string, genre: string): void {
    this.dialog.open(DetailsDialogComponent, {
      data: { title, imagepath, description, director, genre },
      width: '350px',
    });
  }

  /**
   * Adds the movie to the user's list of favorites.  The favorites list is stored in the database and is viewable on the user profile.
   * @param id 
   * @param title 
   */
  addFavourite(id: string, title: string): void {
    this.fetchApiData2.addFavouriteMovie(id).subscribe(() => {
      this.snackBar.open(`${title} has been added to your favorites!`, 'OK', {
        duration: 2000,
      });
    });
  }
}

