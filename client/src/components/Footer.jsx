import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-400 z-20 py-12 relative">
            <div className="container z-10 mx-auto px-6 sm:px-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 text-center sm:text-left">

                    <div className="flex flex-col items-center sm:items-start space-y-4">
                        <div className="flex justify-center sm:justify-start items-center space-x-4">
                            <Link
                                to='/'
                                className="text-gray-400 hover:text-gray-200 text-2xl"
                                aria-label="Facebook"
                            >
                                <i className="fab fa-facebook"></i>
                            </Link>
                            <Link
                                href="mailto:campushomelk@gmail.com"
                                className="text-gray-400 hover:text-gray-200 text-2xl"
                                aria-label="Email Us"
                            >
                                <i className="fas fa-envelope"></i>
                            </Link>
                        </div>
                        <p className="text-sm">Patents Pending</p>
                        <p className="text-sm">© MyCampusHome, Inc.</p>
                    </div>

                    <div>
                        <h3 className="text-gray-200 font-semibold mb-4">For Tenants</h3>
                        <ul className="space-y-2">
                            <li><Link to='/' className="hover:text-gray-100">Apply Online</Link></li>
                            <li><Link to='/' className="hover:text-gray-100">Schedule Tour</Link></li>
                            <li><Link to='/' className="hover:text-gray-100">Negotiate Rent</Link></li>
                            <li><Link to='/' className="hover:text-gray-100">Pay Rent</Link></li>
                            <li><Link to='/' className="hover:text-gray-100" >Maintenance Request</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-gray-200 font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li><Link to='/' className="hover:text-gray-100">Help Center</Link></li>
                            <li><Link to='/' className="hover:text-gray-100">Pricing</Link></li>
                            <li><Link to='/faq' className="hover:text-gray-100">FAQ</Link></li>
                            <li><Link to='/' className="hover:text-gray-100">Sitemap</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-gray-200 font-semibold mb-4">For Landlords</h3>
                        <ul className="space-y-2">
                            <li><Link to='/list-property' className="hover:text-gray-100">List an Accommodation</Link></li>
                            <li><Link to='/' className="hover:text-gray-100">Syndicate Listing</Link></li>
                            <li><Link to='/' className="hover:text-gray-100">Arrange Tour </Link></li>
                            <li><Link to='/' className="hover:text-gray-100">Tenant Screening</Link></li>
                            <li><Link to='/' className="hover:text-gray-100">Collect Rent</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-gray-200 font-semibold mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li><Link to='/' className="hover:text-gray-100">About Us</Link></li>
                            <li><Link to='/' className="hover:text-gray-100">Our News</Link></li>
                            <li><Link to='/' className="hover:text-gray-100">For Partners</Link></li>
                            <li><Link to='/' className="hover:text-gray-100">For Investors</Link></li>
                            <li><Link to='/' className="hover:text-gray-100">Terms of Use</Link></li>
                            <li><Link to='/' className="hover:text-gray-100">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 flex flex-wrap justify-center md:justify-start space-x-4">
                    <Link to='/' aria-label="Get it on Google Play">
                        <img
                            src="/GooglePlay.webp"
                            alt="Google Play"
                            className="h-12"
                        />
                    </Link>
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
