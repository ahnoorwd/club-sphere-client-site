import React from 'react';
import Hero from './Hero';
import Categories from './categories';
import FeaturedClubs from './FeaturedClubs';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <FeaturedClubs></FeaturedClubs>
            <Categories></Categories>
        </div>
    );
};

export default Home;