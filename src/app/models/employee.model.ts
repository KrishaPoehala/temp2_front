import { Genre } from "./genre.enum";


export interface Employee {
    id:string,
    firstName:string,
    lastName:string,
    city:string,
    genre:Genre
}