import React from 'react'
import Hero from '../components/Hero/Hero';
import Banner from '../components/Banner/Banner';
import Featured from '../components/Featured/Featured';
import Intro from '../components/Intro/Intro';
import Footer from '../components/Footer/Footer';

export default function Home() {
    return (
        <>
            <Hero>
                <Banner title="Latest" subtitle="soles and laces">
                    <div className="btn btn-primary">shop now</div>
                </Banner>
            </Hero>
            <Intro />
            <Featured />
            <Footer />
        </>
    )
}
