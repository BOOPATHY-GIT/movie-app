import { Component, OnInit} from '@angular/core';
import { MovieService } from '../services/movie.service';
import {FeaturedActorType} from './movie.interface';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  public movieData = [];
  public mostFeaturedActor: FeaturedActorType;
  public leastFeaturedActor: FeaturedActorType;
  public displayedColumns: string[] = ['title', 'rating', 'ifco', 'budget'];
  private listOfActors = [];
  private ifcoOrder = ['N/A', 'G', 'PG', '12', '12A', '15', '15A', '16', '18'];

  constructor(public movieService: MovieService) { }

  ngOnInit() {
    this.getMovies();
  }

  public postActorData() {
    this.movieService.postData([this.mostFeaturedActor, this.leastFeaturedActor], 'movies').subscribe(res => {
      console.log('RES**', res);
    }, err => {
      console.log(err);
    });
  }

  private getMovies() {
    this.movieService.getData('movies?limit=155').subscribe((movieData) => {
      if (movieData) {
        this.movieData = movieData;
        this.findFeaturedActors();
      }
    });
  }

  private findFeaturedActors() {
    this.listOfActors = this.movieData.reduce((actors, movie) => actors.concat(movie.cast), []).filter(x => typeof(x) === 'string');
    this.mostFeaturedActor = this.mostOccuringActor();
    this.leastFeaturedActor = this.leastOccuring();
  }

  private mostOccuringActor() {
    const mostOccurringActor = [...this.listOfActors.sort().reduce((r, n) => // create a map of occurrences
      r.set(n, (r.get(n) || 0) + 1), new Map()
    )]
      .reduce((r, v) => v[1] > r[1] ? v : r)[0];
    return this.findRelatedMovies(mostOccurringActor);
  }

  private leastOccuring() {
    const leastOccurringActor = [...this.listOfActors.sort().reduce((r, n) => // create a map of occurrences
      r.set(n, (r.get(n) || 0) + 1), new Map()
    )]
      .reduce((r, v) => v[1] < r[1] ? v : r)[0]; // get the the item that appear less times
    return this.findRelatedMovies(leastOccurringActor);
  }

  private findRelatedMovies(actorName: string): FeaturedActorType {

    const movieRecordsForActor = this.movieData.filter(movie => movie.cast.includes(actorName)).sort();
    const maxBudget = Math.max(...movieRecordsForActor.map(record => parseFloat(record.budget.replace('$', '').replace(',', ''))));
    const maxBudgetMovie = this.movieData.find(x => parseFloat(x.budget.replace('$', '').replace(',', '')) === maxBudget);

    const maxRating = Math.max(...movieRecordsForActor.map(record => record.rating));
    const maxRatingMovie = this.movieData.find(x => x.rating === maxRating);

    let maxIFCORatingMovie;
    this.ifcoOrder.map(rec => {
      const tempIFCORatingMovie = movieRecordsForActor.find(movie => movie.ifco === rec);
      maxIFCORatingMovie = tempIFCORatingMovie ? tempIFCORatingMovie : maxIFCORatingMovie;
    });
    return {
      actor: actorName,
      totalMovies: movieRecordsForActor.length,
      highestRatedMovie: { title: maxRatingMovie.title, rating : maxRatingMovie.rating },
      highestBudgetMovie: { title: maxBudgetMovie.title, budget: maxBudgetMovie.budget },
      highestIFCORatedMovie: { title: maxIFCORatingMovie.title, ifco : maxIFCORatingMovie.ifco }
    };
  }

}
