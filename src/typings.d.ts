export interface Post {
    _id: string;
    publishedAt: string;
    views: string;
    title: string;
    slug: {
        current: string
    };
    author: {
        name: string;
        image: {
            asset: {
                _ref: string
            }
        };
    },
    discription: string;
    mainImage:{
        asset:{
            _ref:string
        }
    }
    body: Array;
}