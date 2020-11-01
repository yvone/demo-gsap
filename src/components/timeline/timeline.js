import React from 'react';
import gsap from 'gsap';

import './timeline.css';

class Timeline extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            status: 'pause',
            progress: 0,
        }

        this.myElement = null;

        this.myTween = gsap.timeline({paused: true});

        this.handleSpeed = this.handleSpeed.bind(this);
        this.handleTogglePlay = this.handleTogglePlay.bind(this);
        this.handlePause = this.handlePause.bind(this);
        this.handleReverse = this.handleReverse.bind(this);
        this.handleRestart = this.handleRestart.bind(this);
    }

    componentDidMount(){
        this.myTween
            .to(this.myElement, {
                duration: 1,
                x: 100,
                onReverseComplete: this.handlePause,
            })
            .to(this.myElement, {
                duration: 1,
                y: 100,
                rotation: 90,
                onComplete: this.handlePause,
            })
    }

    componentWillUnmount() {
        this.myTween.kill();
    }

    handleSpeed(e) {
        const value = e.target.value;

        this.setState({
            status: 'pause',
            progress: value,
        }, () => {
            this.myTween.progress(value/100).pause();
        })
    }

    handleTogglePlay() {
        if (this.state.status === 'play') {
            this.setState({
                status: 'pause',
            }, () => {
                this.myTween.pause();
            })
        } else {
            this.setState({
                status: 'play',
            }, () => {
                if (
                    this.myTween.progress() === 1
                    || (this.myTween.progress() === 0 && this.myTween.reversed())
                ) {
                    // the animation is over, restart
                    this.myTween.restart();
                } else {
                    // the animation was paused, resume
                    this.myTween.resume();
                }
            })
        }
    }

    handlePause() {
        this.setState({
            status: 'pause',
        })
    }

    handleReverse() {
        this.setState({
            status: 'play',
        }, () => {
            this.myTween.reverse();
        })
    }

    handleRestart() {
        this.setState({
            status: 'play',
        }, () => {
            this.myTween.restart();
        })
    }

    render() {
        const {
            status,
            progress,
        } = this.state;

        const label = status === 'play' ? 'pause' : 'play';

        return (
            <div className="Container">
                <div className="Canvas">
                    <div
                        ref={div => this.myElement = div}
                        className="Element"
                    >
                        Hello world
                    </div>
                </div>

                <div className="Controls">
                    <input
                        type="range"
                        value={progress}
                        onChange={this.handleSpeed}
                    />
                    <button onClick={this.handleTogglePlay}>
                        {label}
                    </button>
                    <button onClick={this.handleReverse}>
                        reverse
                    </button>
                    <button onClick={this.handleRestart}>
                        restart
                    </button>
                </div>
            </div>
        );
    }
}

export default Timeline;
