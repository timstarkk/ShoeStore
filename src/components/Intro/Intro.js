import React from 'react';
import './Intro.css';
import Title from '../Title/Title';
import Image from '../../images/sneakerImage.jpeg';

export default function Intro() {
    return (
        <section className="intro-section">
            <Title title="what you really want to wear" />
            <div className="intro-text-container">
                <p>
                    Don't wait for the crowd. Get the sneakers that fit your style. We have the latest and greatest pieces for you to add to your collection and show yourself off.
                </p>
            </div>
            <div className="intro-feature">
                <img src={Image} alt="dsfasd" />
                <div className="intro-feature-text">
                    <h4>hello from in here</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ex inventore, sint asperiores sequi accusantium soluta consequatur reiciendis illo ad incidunt, perspiciatis modi iure architecto voluptas, quidem doloremque vitae porro?</p>
                    <div className="btn-container">
                        <div className="btn btn-primary">get some</div>
                    </div>
                </div>
            </div>
        </section>
    )
}
