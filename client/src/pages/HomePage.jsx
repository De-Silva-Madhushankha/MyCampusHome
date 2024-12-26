import HeroSection from '../components/HeroSection';
import CityGrid from '../components/UnisGrid';
import RentalProcess from '../components/RentalProcess';
import Features from '../components/Features';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function HomePage() {
  return (
    <>
      <Navbar/>
      <HeroSection />
      <CityGrid />
      <RentalProcess />
      <Features />
      <Footer />
      
    </>
  );
}