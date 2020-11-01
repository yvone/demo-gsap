import React from 'react';
import gsap from 'gsap';
import { IconButton } from 'spoton-lib';

import './actions.css';

class GsapComponent extends React.Component {
    constructor(props){
        super(props);

        // refs for targets
        this.overlay = null;
        this.actions = [];

        // tween ~ gsap animation
        this.myTween = gsap.timeline({paused: true});

        this.playAnimation = this.playAnimation.bind(this);
        this.stopAnimation = this.stopAnimation.bind(this);
    }

    componentDidMount(){
        this.myTween
            .to(this.overlay, {
                duration: 0.1,
                opacity: 1,
            })
            .fromTo(this.actions, {
                y: -50,
                opacity: 0,
            }, {
                ease: 'expo.out',
                y: 0,
                opacity: 1,
                stagger: 0.1,
            })
    }

    componentWillUnmount() {
        this.myTween.kill();
    }

    playAnimation() {
        this.myTween.play();
    }

    stopAnimation() {
        // restart the animation and freeze
        this.myTween.restart().pause();
    }

    render(){
        const {
            className,
            actions,
            imgUrl,
            imgAlt,
        } = this.props;

        return (
            <div className="Container"
                onMouseEnter={this.playAnimation}
                onMouseLeave={this.stopAnimation}
            >
                <div
                    className="Overlay"
                    ref={el => this.overlay = el}
                >
                    {
                        actions.map((action, idx) => (
                            <div
                                className="Action"
                                key={action.iconName}
                                ref={el => this.actions[idx] = el}
                            >
                                <IconButton
                                    className="Action_button"
                                    color={action.color}
                                    name={action.iconName}
                                    alt={action.iconAlt}
                                    size={45}
                                    onClick={action.onClick}
                                />
                                <p className="Action_text">{action.title}</p>
                            </div>
                        ))
                    }
                </div>
                <img src={imgUrl} alt={imgAlt} className={className}/>
            </div>
        );
    }
}

export default GsapComponent;
