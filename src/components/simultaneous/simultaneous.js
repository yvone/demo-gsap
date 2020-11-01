import React from 'react';
import gsap from 'gsap';

import './simultaneous.css';

class Simultaneous extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            rotation: 0,
        }

        this.myElement = null;

        this.playAnimation = this.playAnimation.bind(this);
    }

    componentDidMount() {
        gsap.to(this.myElement, {
            duration: 1.2,
            scaleX: 0.8,
            scaleY: 0.8,
            ease: "power1.inOut",
            yoyo: true,  // from A to B and then B to A
            repeat: -1,  // infinite
        });
    }

    playAnimation() {
        this.setState((prevState) => {
            return {
                rotation: prevState.rotation === 0 ? 360 : 0
            };
        }, () => {
            gsap.to(this.myElement, {
                duration: 1,
                rotation: this.state.rotation,
                ease: "elastic.easeOut"
            })
        })
    }

    render() {
        return (
            <div className="App">
                <div
                    ref={el => this.myElement = el}
                    className="Element"
                    onMouseOver={this.playAnimation}
                >
                    Hello world
                </div>
            </div>
        );
    }
}

export default Simultaneous;
