import React from 'react';
// import Hero from './Hero';
import Categories from './categories';
import FeaturedClubs from './FeaturedClubs';
import HeroSlider from '../components/HeroSlider';

const Home = () => {
    return (
        <div>
            <HeroSlider />
            <FeaturedClubs></FeaturedClubs>
            <Categories></Categories>
        </div>
    );
};

export default Home;