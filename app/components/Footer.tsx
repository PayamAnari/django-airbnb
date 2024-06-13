const Footer = () => {
  return (
    <footer className="w-full fixed bottom-0 left-0 py-6 border-t bg-white z-10">
      <div className="max-w-[1500px] mx-auto px-6">
        <div className="flex lg:space-x-2 gap-2">
          <div className="flex flex-row flex-wrap gap-2  mt-2  text-gray-600 ">
            <p className="hover:text-black">© 2024 Airbnb, Inc.</p>
            <p>.</p>
            <p className="hover:text-black">Privacy</p>
            <p>.</p>
            <p className="hover:text-black">Terms</p>
            <p>.</p>
            <p className="hover:text-black">Sitemap</p>
            <p>.</p>
            <p className="hover:text-black">UK Modern Slavery Act</p>
            <p>.</p>
            <p className="hover:text-black">Company details</p>
            <p>.</p>
            <p className="hover:text-black">Airbnb UK Limited S-172 Statement</p>
            <p>.</p>
            <p className="hover:text-black">Django <span className="text-airbnb">Airbnb</span> Project</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
