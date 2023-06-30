import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import './Search.css';

const Search = () => {
    const allSpots = useSelector(state => state.spots.allSpots);
    const allSpotsArr = Object.values(allSpots);
    const { search } = useLocation();
    const query = new URLSearchParams(search).get('query');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const inputRef = useRef();
    const ulRef = useRef(null);

    useEffect(() => {
        if (query) {
            setSearchTerm(query);
        }
    }, [query]);

    useEffect(() => {
        if (searchTerm.length > 1) {
            const filteredSpots = allSpotsArr.filter(
                (spot) =>
                    spot.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    spot.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    spot.country.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchResults(filteredSpots);
        } else {
            setSearchResults([]);
        }
    }, [searchTerm]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleClickOutside = (e) => {
        if (ulRef.current && !ulRef.current.contains(e.target) && !inputRef.current.contains(e.target)) {
            setSearchTerm('');
        }
    };

    const handleNavLinkClick = () => {
        setSearchTerm('');
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="search-bar-container">
            <input
                ref={inputRef}
                className="search-bar"
                type="text"
                placeholder="Search by city, state, or country"
                value={searchTerm}
                onChange={handleSearch}
            />
            {searchResults.length > 0 && searchTerm.length > 1 && (
                <div className="search-results" ref={ulRef}>
                    {searchResults.map((spot) => (
                        <div className='search-results-container' key={spot.id}>
                            <NavLink to={`/spots/${spot.id}`} className="search-results-navlink" onClick={handleNavLinkClick}>
                                <img src={spot.previewImage} className="search-bar-spot-image" alt="Spot Preview" />
                                <div className="search-results-content">
                                    <div className="search-bar-spot-name">{spot.name}</div>
                                    <div className="search-bar-price">${spot.price} /night</div>
                                    <div className="search-bar-location">{spot.city}, {spot.state}</div>
                                </div>
                            </NavLink>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Search;
