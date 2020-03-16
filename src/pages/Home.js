import React from 'react'
import Hero from '../components/Hero/Hero';
import Banner from '../components/Banner/Banner';
import Featured from '../components/Featured/Featured';

export default function Home() {
    return (
        <>
            <Hero>
                <Banner title="TIM STARK" subtitle="Full-Stack Developer">
                    <div className="btn btn-primary">shop now</div>
                </Banner>
            </Hero>
            <Featured />
        </>
    )
}
