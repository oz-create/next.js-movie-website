export type ListType = {
    poster_path: string;
    id: number;
    backdrop_path: string;
    title: string;
    overview: string;
    vote_average: number;
    description: string;
    rating: number;
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
    poster_path : string
}