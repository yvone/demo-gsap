import React from 'react';
import { TimelineLite } from 'gsap';
import { IconButton } from 'spoton-lib';

import './actions.css';

class GsapComponent extends React.Component {
    constructor(props){
        super(props);

        // refs for targets
        this.container = null;
        this.overlay = null;
        this.actions = [];

        // tween ~ gsap animation
        this.myTween = new TimelineLite({paused: true});
        // this.myTween = gsap.timeline();

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
        this.container.addEventListener("mouseenter", this.playAnimation);
        this.container.addEventListener("mouseleave", this.stopAnimation);
    }

    playAnimation() {
        this.myTween.play();
    }

    stopAnimation() {
        this.myTween.restart().pause()
    }

    render(){
        const {
            className,
            actions,
            imgUrl,
            imgAlt,
        } = this.props;

        return (
            <div className="container"
                ref={node => this.container = node}
            >
                <div
                    className="overlay"
                    ref={node => this.overlay = node}
                >
                    {actions.map((action, idx) => (
                        <div
                            className="Action"
                            key={action.iconName}
                            ref={ img => this.actions[idx] = img }
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
                    ))}
                </div>
                <img src={imgUrl} alt={imgAlt} className={className}/>
            </div>
        );
    }
}

export default GsapComponent;
