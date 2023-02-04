export interface Post{
    _id:string;
    publishedAt:string;
    views:string;
    title:string;
    slug:{
        current:string
    };
    author:{
        name:string;
        image:string;
    },
    discription:string;
    mainImage:object;
    body:object;
}