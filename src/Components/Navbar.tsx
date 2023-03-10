import Link from "next/link";




export default function Navbar() {
    return (
        <div className=" fixed z-50 w-full top-0">
            <nav className="h-auto md:p-4 p-2 bg-[#0C0C0F] sticky top-0  shadow-2xl">
                <div className="md:h-[40px] h-8 items-center  flex justify-between">
                    <div className=" text-white font-rosh tracking-widest text-lg mx-3 md:mx-10">
                    <Link href={"/"} className="text-center">
                            <p>Academia</p>
                        </Link>
                    </div>
                    <div className="font-shibu tracking-wide rounded-md flex items-center justify-end space-x-6">
                        <Link href={"/blogPage"} className=" hover:bg-blue-400 p-2 px-4 rounded-md text-center">
                            <p>Blogs</p>
                        </Link>
                        <Link href={"/reach"} className=" hover:bg-blue-400 p-2 px-4 rounded-md text-center">
                            <p>Reach</p>
                        </Link>

                    </div>
                </div>
            </nav>
        </div>
    )
}


