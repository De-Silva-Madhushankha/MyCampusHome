import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import { toast } from "react-toastify";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = async () => {
        if (!query.trim()) {
            toast.error("Please enter a city, address, or ZIP code.");
            return;
        }

        try {
            const response = await fetch(
                `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
                    query
                )}&key=20c065102b7d44bdbe501361452f21be`
            );

            const data = await response.json();

            if (data.results && data.results.length > 0) {
                const { lat, lng } = data.results[0].geometry;

                navigate(`/search?lat=${lat}&lng=${lng}`);
            } else {
                toast.error("We couldn't find the location. Please try again.");
            }
        } catch (error) {
            console.error("Error fetching geocoding data:", error);
            toast.error("An error occurred. Please check your network connection and try again.");
        }
    };

    return (
        <div className="hidden lg:flex items-center space-x-6 flex-1 justify-center">
            <div className="relative w-full max-w-lg">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="text-gray-700" />
                </div>
                <input
                    type="text"
                    placeholder="Type in City, address, or ZIP code"
                    className="block w-full pl-10 px-4 py-2 text-sm rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
            </div>
        </div>
    );
};

export default SearchBar;
