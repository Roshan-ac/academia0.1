import Image from 'next/image'
import { sanityClient } from '../../../sanity'
import {urlFor} from '../../../sanity'
import { Post } from '../../../typings'
import { GetStaticProps } from 'next'



interface Props{
  posts:[Post]
}

const Post = ({ posts }: Props) => {
  return (
<main className=' h-screen  overflow-scroll'>
  <div className=' h-max md:p-4 items-center space-y-8'>
 <img src={urlFor(posts.mainImage.asset._ref).url()!} alt={'image'} className={' w-full h-32 md:h-56 object-cover rounded-md shadow-xl shadow-zinc-700'} />
 <div className=' md:space-y-3 md:p-8 p-2 space-y-2'>
  <h2 className=' font-shibu font-bold tracking-wider md:text-xl text-sm uppercase underline md:underline-offset-8 underline-offset-4'>{posts.title}</h2>
  <h2 className=' font-sans  tracking-wide text-sm opacity-40 lowercase'>{posts.discription}</h2>
 <div className=' flex space-x-2 items-center'>
  <img src={urlFor(posts.author.image.asset._ref).url()!} className='rounded-full h-10 w-10' alt='author' />
  <h2 className=' text-center font-sans md:p-2 tracking-wide text-sm opacity-40 lowercase'>{posts.author.name}</h2>
 </div>
 <div className=' text-sm text-itallic font-shibu p-2'>
 {
  posts.body.map((data)=>{
    for (let i = 0; i < data.children[0].text.length; i++) {
      if(data.children[0].text[i]==1){
        return(<>
          <div className=' h-4'></div>
          <p>{data.children[0].text}</p>
        </>
        )
      }
    }
    return(
      <p>{data.children[0].text}</p>
    )
  })
 }
 </div>
 </div>
  </div>
</main>
  )
}

export default Post



export const getStaticPaths = async ()=> {
  const query = `
  *[_type=="post"]{
    _id,
      slug{
        current
      }
  }
  `
  const posts = await sanityClient.fetch(query)
  const paths = posts.map((post:Post)=>({
    params:{
      slug:post.slug.current
    }
  }))

  return {
    paths,
    fallback:'blocking', // can also be true or 'blocking'
  }
}


export const getStaticProps:GetStaticProps= async({params})=>{

  const query = `
  *[_type == 'post' && slug.current== $slug][0]{
    _id,
      title,
      discription,
      author->{
        name,
        image
      },
      mainImage,
      slug,
      body
    }`
    const posts = await sanityClient.fetch(query,{
      slug:params?.slug
    })    
 
    if(!posts){
      return{
        notFound:true
      }
    }

    return{
      props:{posts}
    }
}



