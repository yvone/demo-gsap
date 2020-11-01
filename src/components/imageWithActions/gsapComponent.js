import React from 'react';
import { TweenLite, TimelineLite } from 'gsap';
import { IconButton } from 'spoton-lib';

import './actions.css';

class GsapComponent extends React.Component {
    constructor(props){
        super(props);

        // refs for targets
        this.overlay = null;
        this.actions = [];

        // tween ~ gsap animation
        this.myTween = new TimelineLite({paused: true});

        this.handleHover = this.handleHover.bind(this);
        this.handleOut = this.handleOut.bind(this);
    }

    handleHover() {
        this.myTween
            .to(this.overlay, {
                duration: 0.1,
                opacity: 1,
                repeat: 0,
            })
            .staggerFrom(this.actions,
                1, {
                    ease: 'expo.out',
                    y: -50,
                    opacity: 0,
                    stagger: 0.1,
                    repeat: 0,
                }
            )
            .play();
    }

    handleOut() {
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
            <div className="container">
                <div
                    className="overlay"
                    ref={node => this.overlay = node}
                    onMouseOver={this.handleHover}
                    onMouseOut={this.handleOut}
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
