import { Component } from '@angular/core';
import { Article } from './article/article';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  articles: Article[];

  constructor() {
    this.articles = [
      new Article('Angular 2', 'http://angular.io', 3),
      new Article('Fullstack', 'http://fullstack.io', 2),
      new Article('TypeScript', 'http://typescriptlang.org', 1),
    ];
  }

  addArticle(title: HTMLInputElement, link: HTMLInputElement): boolean { 
    console.log(`Dodajem članak: ${title.value} i link: ${link.value}`); 
    this.articles.push(new Article(title.value, link.value, 0));
    title.value = '';
    link.value = '';
    return false; 
  }

  sortedArticles(): Article[] {
    return this.articles.sort((a: Article, b: Article) => b.votes - a.votes);
  }  
}
