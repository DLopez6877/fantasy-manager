export class NewsArticle {
  constructor (
    public id: number,
    public title: string,
    public teaser_title: string,
    public publish_date: number,
    public image: string,
    public image_token: string
  ) { }
}
