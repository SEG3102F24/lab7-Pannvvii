import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Book} from '../model/author';
import {BooksService} from '../service/author.service';
import {Subscription} from "rxjs";
import { AuthornamesPipe } from '../../pipes/authornames.pipe';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-book',
    templateUrl: './author.component.html',
    styleUrls: ['./author.component.css'],
    standalone: true,
    imports: [NgIf, AuthornamesPipe]
})
export class BookComponent implements OnInit, OnDestroy {
  selectedBook!: Book | null;
  private subscription!: Subscription;
  private route: ActivatedRoute = inject(ActivatedRoute);
  private booksService: BooksService = inject(BooksService);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.subscription = this.booksService.getBook(id).subscribe({
        next: (data: Book) => {
          this.selectedBook = data;
        },
        error: (_: any) => {
          this.selectedBook = null;
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
