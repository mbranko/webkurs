export class Article { 
  title: string; 
  link: string; 
  votes: number;

  constructor(title: string, link: string, votes?: number) { 
    this.title = title;
    this.link = link;
    this.votes = votes || 0;
  } 

  domain(): string { 
    try {
      // 1. skini http://
      const domainAndPath: string = this.link.split('//')[1];
      // 2. skini sve iza prve /
      return domainAndPath.split('/')[0];
    } catch (err) {
      return null; 
    }
  }
}

