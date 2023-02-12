import Head from 'next/head'
import Image from 'next/image'
import profile from '../assets/profile.jpg'
import { sanityClient } from '../sanity'
import { Post } from '@/typings'
import Link from 'next/link'
import DateFormatter from '@date-js/date-formatter'
import { formatDistance, formatRelative, subDays } from 'date-fns'



const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

interface Props {
  posts: [Post]
}
export default function Home({ posts }: Props) {
  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str)
  return (
    <>
      <Head>
        <title>Academia IMPACT!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Academia IMPACT! is a blog platform covering sociology and technology-related topics. Get the latest insights on how technology is changing society and culture." />
        <meta name="keywords" content="Sociology, Technology, Culture, Society, Blogs, Insights" />
        <meta name="author" content="Academia IMPACT!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={"h-max space-y-10 md:space-y-20 pt-20"}>
        {/* Author about - Section goes here */}
        <div className=' md:flex justify-center md:mt-6'>
          <div className='py-3 space-y-5'>
            <div className=' flex justify-center'>
              <div style={{ 'position': 'relative', 'zIndex': '-1' }} className=' bg-slate-400 p-1 shadow-md rounded-full w-28'>
                <Image placeholder="blur"
                  blurDataURL={`${profile},${toBase64(shimmer(700, 475))}`} className='rounded-full object-contain' src={profile} alt={''} />
              </div>
            </div>
            <div className='font-shibu p-3 text-center tracking-wide flex justify-center'>
              <p className=' font-semibold font-lg md:w-[900px]'> Myself Suyog Dev Khanal, a sociologist and technology enthusiast, delving into the impact of technology on society through this blog. Sharing unique perspectives on the intersection of sociology and technology. </p>
            </div>
          </div>
        </div>

        {/* Some highlight section goes here */}

        <div className=' h-1/2 px-5 md:py-6 py-3 space-y-2'>
          <div className=' md:flex justify-center'>
            <div className=' p-2 md:p-5 shadow-2xl md:w-90'>
              <p className='  font-shibu font-bold text-lg tracking-wider'>Some Highlights</p>
            </div>
          </div>
          {/* Higlight elements goes here */}
          <div className=' md:flex justify-center'>
            <div className=' overflow-hidden rounded-md md:w-[800px] py-3'>
              {
                posts.map((data,index) => {
                if(index==4){
                  return 
                }
                  
                  return (
                    <Link key={data._id} href={`/post/${data.slug.current}`}>
                      <div className="cursor-pointer shadow-md  hover:text-gray-800 font rounded-lg md:flex items-center align-middle md:space-x-10 space-y-3 p-2 py-5 md:space-y-0">
                        <div className='md:w-1/2 '>
                          <p className='truncate hover:text-clip w-80 md:w-60 overflow-hidden whitespace-nowrap font-shibu tracking-normal text-sm md:text-md'>{data.title}</p>
                        </div>
                        <div className='flex md:justify-start justify-start md:w-1/2'>
                          <div className=' md:ml-20'>
                            <div className='flex justify-start space-x-4'>
                              <span className=' bg-purple-500 w-1'></span>
                              <p className=' text-xs font-shibu font-bold tracking-normal text-left w-40 '>
                                {formatDistance(subDays(new Date(), 3), new Date(data.publishedAt))}
                              </p>
                              <p className=' text-xs font-shibu font-bold tracking-normal text-left w-40 uppercase'>{data.views}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })
              }
            </div>
          </div>

        </div>

      </main>
    </>
  )
}


export const getServerSideProps = async () => {
  const query = `
  *[_type=="post"]{
    publishedAt,
    _id,
      slug,
      views,
      title,
      discription,
      author ->{
        name,
        image
      },
      body
  }
  `
  const posts = await sanityClient.fetch(query)
  return {
    props: { posts }
  }
}


