const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-400 z-20 py-12 relative">
            <div className="container z-10 mx-auto px-6 sm:px-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 text-center sm:text-left">

                    <div className="flex flex-col items-center sm:items-start space-y-4">
                        <div className="flex justify-center sm:justify-start items-center space-x-4">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-gray-200 text-2xl"
                                aria-label="Facebook"
                            >
                                <i className="fab fa-facebook"></i>
                            </a>
                            <a
                                href="mailto:campushome@gmail.com"
                                className="text-gray-400 hover:text-gray-200 text-2xl"
                                aria-label="Email Us"
                            >
                                <i className="fas fa-envelope"></i>
                            </a>
                        </div>
                        <p className="text-sm">Patents Pending</p>
                        <p className="text-sm">© CampusHome, Inc.</p>
                    </div>

                    <div>
                        <h3 className="text-gray-200 font-semibold mb-4">For Tenants</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-gray-100">Apply Online</a></li>
                            <li><a href="#" className="hover:text-gray-100">Schedule Tour</a></li>
                            <li><a href="#" className="hover:text-gray-100">Negotiate Rent</a></li>
                            <li><a href="#" className="hover:text-gray-100">Pay Rent</a></li>
                            <li><a href="#" className="hover:text-gray-100">Maintenance Request</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-gray-200 font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-gray-100">Help Center</a></li>
                            <li><a href="#" className="hover:text-gray-100">Pricing</a></li>
                            <li><a href="#" className="hover:text-gray-100">FAQ</a></li>
                            <li><a href="#" className="hover:text-gray-100">Sitemap</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-gray-200 font-semibold mb-4">For Landlords</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-gray-100">List a Property</a></li>
                            <li><a href="#" className="hover:text-gray-100">Syndicate Listing</a></li>
                            <li><a href="#" className="hover:text-gray-100">Arrange Tour </a></li>
                            <li><a href="#" className="hover:text-gray-100">Tenant Screening</a></li>
                            <li><a href="#" className="hover:text-gray-100">Collect Rent</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-gray-200 font-semibold mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-gray-100">About Us</a></li>
                            <li><a href="#" className="hover:text-gray-100">Our News</a></li>
                            <li><a href="#" className="hover:text-gray-100">For Partners</a></li>
                            <li><a href="#" className="hover:text-gray-100">For Investors</a></li>
                            <li><a href="#" className="hover:text-gray-100">Terms of Use</a></li>
                            <li><a href="#" className="hover:text-gray-100">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 flex flex-wrap justify-center md:justify-start space-x-4">
                    <a href="#" aria-label="Get it on Google Play">
                        <img
                            src="/GooglePlay.webp"
                            alt="Google Play"
                            className="h-12"
                        />
                    </a>
                </div>
            </div>

            <div
                className="absolute bottom-0 left-0 w-full -z-10 h-1/2 bg-no-repeat bg-center color-bg"
                style={{
                    backgroundImage: 'url(/footer-city-bg.svg)',
                    filter: 'brightness(9) contrast(2)',
                }}
            ></div>
        </footer>
    );
};

export default Footer;
