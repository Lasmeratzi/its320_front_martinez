import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { QuotesService } from '../quote.service';

type Quotes = {
  _id: string;
  author: string;
  title: string;
  quote: string;
  published: string;
  isConfucius?: boolean;
}

@Component({
  selector: 'displayquotes',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './displayquotes.component.html',
  styleUrls: ['./displayquotes.component.css']
})
export class DisplayquotesComponent {
  quotes: Quotes[] = [];

  constructor(private newQuotes: QuotesService) {}

  async ngOnInit() {
    this.newQuotes.Get().subscribe((quotes: Quotes[]) => {
      this.quotes = quotes.map(quote => ({
        ...quote,
        isConfucius: quote.author === 'Confucius'
      }));
    });
  }
}
