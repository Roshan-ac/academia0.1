import { sanityClient } from '../../sanity'
import { urlFor } from '../../sanity'
import { Post } from '../../typings'
import { GetStaticProps } from 'next'
import PortableText from 'react-portable-text'





interface Props {
  posts: [Post]
}
const Post = ({ posts }: Props) => {
  return (
    <main className=' h-screen  overflow-scroll'>
      <div className=' h-max md:py-2 items-center space-y-8'>
        <img src={urlFor(posts[0].mainImage.asset._ref).url()!} alt={'image'} className={' w-full h-32 md:h-30 object-cover'} />
        <div className=' md:space-y-3 md:p-8 p-2 space-y-2'>
          <h2 className=' font-shibu font-bold tracking-wider md:text-xl text-sm uppercase'>{posts[0].title}</h2>
          <h2 className=' font-sans  tracking-wide text-sm opacity-40'>{posts[0].discription}</h2>
          <div className=' flex space-x-2 items-center pt-3'>
            <img src={urlFor(posts[0].author.image.asset._ref).url()!} className='rounded-full h-10 w-10' alt='author' />
            <h2 className=' text-center font-sans md:p-2 tracking-wide text-sm opacity-40 -z-10 text-green-300'><span>Posted by </span>{posts[0].author.name}</h2>
          </div>
          <div className=' text-sm text-itallic pt-5'>
            <article>
              <PortableText
                className=' space-y-1 font-shibu md:text-lg tracking-wide'
                dataset={process.env.NEXT_PUBLIC_SANITY_DATASET || "production"}
                projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                content={posts[0].body}
                serializers={{
                  h1: (props: any) => <h1 className=' text-3xl py-4' {...props} />,
                  h2: (props: any) => <h1 className=' text-2xl py-3' {...props} />,
                  h3: (props: any) => <h1 className='md:text-2xl font-bold text-lg py-2' {...props} />,
                  h4: (props: any) => <h1 className=' text-md py-2' {...props} />,
                  li: ({ children }: any) => <li className="special-list-item">{children}</li>,
                  img: ({ children }: any) => <img className='m-2 h-50 w-50 rounded-md' src={children} />
                }}
              />
            </article>
            <hr className=' py-2 mt-10'/>
            <form className='p-1 mt-2 space-y-2'>
              <div className=''>
                <h3 className='font-shibu tracking-wide text-lg'>Leave your comment below !</h3>
                <p className=' p-1 font-shibu tracking-wide'>feel free to give any sugesstion</p>
              </div>
              <div className=' p-1'>
                <label className=' space-y-1'>
                  <h4 className='my-2 font-shibu tracking-wide opacity-50'>Name</h4>
                  <input className=' font-shibu tracking-wide text-[16px] pl-2 py-1 rounded w-2/3 text-black outline-none ring-2 ring-yellow-50' placeholder='Enter your name' name='Name' />
                </label>
                <label className=' space-y-1'>
                  <h4 className='my-2 font-shibu tracking-wide opacity-50'>Email</h4>
                  <input className=' font-shibu tracking-wide text-[16px] pl-2 py-1 rounded w-2/3 text-black outline-none ring-2 ring-yellow-50' placeholder='Enter your Email' name='Name' />
                </label>
                <label className=' space-y-1'>
                  <h4 className='my-2 font-shibu tracking-wide opacity-50'>Comment</h4>
                  <textarea className='text-black font-shibu tracking-wide text-[16px] pl-2 py-1 w-2/3 h-[200px] ring-2 ring-yellow-50 rounded outline-none' placeholder='Comment' name='Comment' />
                </label>
              </div>
              <div className=' w-2/3 flex justify-center'>
                <button className='text-black font-shibu font-bold hover:bg-slate-600 hover:text-white tracking-wider text-lg bg-blue-300 px-8 py-1 rounded-xl shadow-yellow-400 shadow' name='Submit'>Submit</button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </main>

  )
}

export default Post



export const getStaticPaths = async () => {
  const query = `
  *[_type=="post"]{
    _id,
      slug{
        current
      }
  }
  `
  const posts = await sanityClient.fetch(query)
  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current
    }
  }))

  return {
    paths,
    fallback: 'blocking', // can also be true or 'blocking'
  }
}


export const getStaticProps: GetStaticProps = async ({ params }) => {

  const query = `
  *[_type == 'post' && slug.current== $slug]{
    _id,
      title,
      discription,
      author->{
        name,
        image
      },
      mainImage{
        asset
      },
      slug,
      body
    }`
  const posts = await sanityClient.fetch(query, {
    slug: params?.slug
  })

  if (!posts) {
    return {
      notFound: true
    }
  }

  return {
    props: { posts }
  }
}



