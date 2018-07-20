import React from 'react';
import { Jumbotron } from 'react-bootstrap';

const Landing = () => {
    return (
        <Jumbotron>
            <div style={{ textAlign: 'center' }}>
                <h1>
                    Cine Nights!
                </h1>
                Easily browse your movies from the convenience of your computer
            </div>
        </Jumbotron>
    );
};

export default Landing;