import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MlsService } from '../mls.service';
import { NewsArticle } from '../models/news-article.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers: [MlsService]
})

export class NewsComponent implements OnInit {
  newsArticles: NewsArticle[];

  constructor(private mlsService: MlsService) { }

  ngOnInit() {
    this.mlsService.getNewsArticles().subscribe(response => {
      response = response.json();
      this.newsArticles = response;
    });
  }
}
