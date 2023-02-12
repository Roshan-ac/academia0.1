import Head from 'next/head'
import Image from 'next/image'
import { sanityClient } from '../sanity'
import { Post } from '@/typings'
import { urlFor } from '../sanity'
import Link from 'next/link'
import { Dropdown } from "@nextui-org/react";
import { useState } from 'react'
import { url } from 'inspector'

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

  const [isOpen, setIsOpen] = useState(false);
  return (
    <main className={"h-max overfo-y-scroll py-3 pr-2 pt-16 md:pt-20"}>
      <div className=' mx-2 md:px-6 flex justify-start'>
        <div className='w-full md:w-2/3 md:flex justify-between md:space-y-0 space-y-10'>
          <div className="md:mx-5 mx-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`bg-gray-800 text-left ease-in-out duration-100 hover:bg-gray-900 text-white font-medium py-2 px-4 rounded-t-xl focus:outline-none ${isOpen ? 'w-48' : 'w-max'}`}
            >
              Categeory
            </button>

            <div className={`${isOpen ? "block" : "hidden"} origin-top-right  w-48 rounded-md shadow-lg`}>
              <div className="rounded-md bg-gray-900 py-2">
                <div
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer py-2 px-4 block whitespace-no-wrap text-sm leading-5 text-white font-medium hover:bg-gray-800 focus:outline-none focus:bg-gray-800"
                >
                  Information Technology
                </div>
                <div
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer py-2 px-4 block whitespace-no-wrap text-sm leading-5 text-white font-medium hover:bg-gray-800 focus:outline-none focus:bg-gray-800"
                >
                  Sociology
                </div>
                <div
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer py-2 px-4 block whitespace-no-wrap text-sm leading-5 text-white font-medium hover:bg-gray-800 focus:outline-none focus:bg-gray-800"
                >
                  Scientific Info
                </div>
              </div>
            </div>
          </div>
          <div className='md:w-2/3 space-y-10'>

          {
            posts.map((data) => {
              return (
                <div key={data._id} className=' bg-gradient-to-tr from-red-300 to-black mx-2 h-52 relative rounded-r-full space-x-1'>
                  <div className=' h-full bg-indigo-700 w-[10px]'></div>
                  <Image src={urlFor(data.mainImage).url()!} height={1000} width={100} alt={''} className="blur-[2px] w-full h-52 object-cover absolute top-0 left-1 opacity-50 drop-shadow-2xl" />
                  <div className=' absolute md:top-3 top-0 md:px-6 space-y-2 md:space-y-0 h-56'>
                    <h1 className=' text-md md:text-md font-extrabold md:tracking-wide text-white bg-black bg-opacity-50 p-2 font-shibu'>{data.title}</h1>
                    <h2 className=' font-shibu overflow-hidden h-28 bg-black bg-opacity-50 p-3 opacity-80'>{data.defination}</h2>
                  </div>
                  <div>
                  <Link key={data._id} href={`/post/${data.slug.current}`} className=" absolute bottom-6 right-4">
                    <button  className='  cursor-pointer bg-indigo-700 drop-shadow-md shadow-white py-2 rounded-full h-12 w-12 text-center font-rosh text-lg flex items-center justify-center'>	&rarr;</button>
                    </Link>
                    
                  </div>
                </div>
              )
            })}
              </div>
        </div>
      </div>

    </main>
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
      body,
      mainImage{
        asset
      },
      defination
  }
  `
  const posts = await sanityClient.fetch(query)
  return {
    props: { posts }
  }
}


