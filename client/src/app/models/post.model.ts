export interface Post {
    _id?:string;
    title:string;
    description?:string;
    imageUrl?:string;
    body:string;
    isActive?:boolean;
    category?:string;
}