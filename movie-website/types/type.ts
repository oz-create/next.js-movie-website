export type ListType = {
    poster_path: string;
    id: number;
    backdrop_path: string;
    title: string;
    overview: string;
    vote_average: number;
    description: string;
    rating: number;
    release_date: string;
    first_air_date: string;
    adult: boolean;
    genre_ids: number[];
    name: string;
    collection?: CollectionType;

};

export type GenresType = {
    id: number,
    name: string
}
export type DetailsType =  ListType &{
    genres : GenresType[],
    original_title: string,
    original_name: string,
    seasons: BelongsToCollection[];
    belongs_to_collection: BelongsToCollection | null,
    production_companies : ProductionCompaniesType[]
}
export type ProductionCompaniesType = {
    logo_path: string
}
export type BelongsToCollection = {
    poster_path : string
}
export type SimilarType = {
  id: number;
  name: string;
  poster_path: string | null;
  overview: string;
  title: string;

};

export type ListTypeArray = ListType[]

export type MovieInfoType = {
    title: string; 
    description: string;
    rating: number;
}


export type CategoriesType = {
    id: number,
    name: string
}

export type CategoriesTypeArray = CategoriesType[]

export  type PeopleType = {
    profile_path: string;
    name: string;
    id:number;
}
export type PeopleTypeArray = PeopleType[];

export type CollectionType = ListType & {
    parts: PartType[];
};

export type CollectionTypeArray = CollectionType[]

export type SeriesType = ListType &{
    seasons: PartType[]
}

export type PartType = {
    poster_path : string | null
}

export type ReviewType = {
    author_details : AuthorDetails,
    content: string,
    created_at: string,
    updated_at: string,
    url: string
}

export type AuthorDetails = {
    name: string,
    username: string,
    avatar_path: string | null,
    rating: number
}