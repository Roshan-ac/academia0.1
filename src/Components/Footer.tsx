export default function Footer() {
    return (
        <footer className="bg-[#0C0C0F] px-5 py-2 space-y-5 mt-8 md:mt-0">
            <div className="p-4 space-y-6 md:flex justify-between md:p-5">
                <div className=" text-white font-rosh tracking-widest text-lg space-y-2">
                    <p>Academia</p>
                    <div className=" bg-white w-72 h-1"></div>
                </div>
                <div className=" text-white font-shibu space-y-4 md:space-y-0">
                    <p className=" text-md font-bold tracking-wide">Contact</p>
                    <p className=" text-sm">Facebook</p>
                    <p className=" text-sm">Linkdin</p>
                </div>
            </div>
            <div className=" text-white flex justify-center">
                <p className=" font-shibu text-sm font-light">Copyright reserved 2022</p>
            </div>
        </footer>
    )
}


