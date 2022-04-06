import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Footer } from './Footer';

export const Home = () => {
    const user = localStorage.getItem('user');
    return (
        <>
            <h1 className='text-center mt-3'>Welcome {user ? user : null}</h1>
            <div className='carousal'>
                <Carousel>
                    <Carousel.Item interval={1000}>
                        <img
                            className="d-block w-100"
                            src="/images/slider2.jpg"
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={500}>
                        <img
                            className="d-block w-100"
                            src="/images/slider3.jpg"
                            alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/images/slider5.png"
                            alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>
            </div>

            <Footer />
        </>
    )
}
