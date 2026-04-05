import React from 'react';
// import Hero from './Hero';
import Categories from './categories';
import FeaturedClubs from './FeaturedClubs';
import HeroSlider from '../components/HeroSlider';
import Reviews from './Reviews/Reviews';
import WhyJoinClub from './WhyJoinClub';

const reviewsPromise = fetch('/reviews.json').then(res => res.json());

const Home = () => {
    return (
        <div>
            <HeroSlider />
            <FeaturedClubs></FeaturedClubs>
            <Categories></Categories>
            <Reviews reviewsPromise={reviewsPromise}></Reviews>
            <WhyJoinClub></WhyJoinClub>
        </div>
    );
};

export default Home;