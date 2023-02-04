import Footer from 'Components/Footer'
import Navbar from 'Components/Navbar'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className=' h-max bg-[#101014] text-[#E6E6EB]'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
