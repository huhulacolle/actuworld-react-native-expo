export default interface INews {
  author: string,
  title: string,
  description: string,
  content: string,
  url: string,
  image?: string,
  publishedAt: string
  source: {
    name: string,
    url: string
  }
}