/*
{
  "page": 1,
  "page_count": 15767,
  "items_per_page": 20,
  "took": 20,
  "timed_out": false,
  "total": 315334,
  "results": [

  ],
  "aggregations": {}
}
*/

interface Location {
  name: string
};
interface Level {
  name: string,
  shortName: string
};
interface Ref {
  landingPage: string
};
interface Company {
  id: number,
  name: string
  shortName: string,
}
interface Job {
  categories: string[],
  company: Company,
  contents: string,
  id: number,
  levels: Level[],
  locations: Location[],
  name: string,
  publicationDate: sring,
  refs: Ref,
  shortName: string,
  tags: [],
  type: 'internal' | 'external',
};
interface ApiSuccess {
  page: number,
  pageCount: number,
  itemsPerPage: number,
  took: number,
  timedOut: boolean,
  total: number,
  results: Job[]
  aggregations: any
};
interface Query {
  page: number,
  descending?: boolean,
  company?: string[],
  category?: string[],
  level?: string[],
  location?: string[]
};