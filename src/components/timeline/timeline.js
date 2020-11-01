import React from 'react';
import { TimelineLite } from 'gsap';
import './timeline.css';

class Timeline extends React.Component {
  constructor(props){
    super(props);
    // reference to the DOM node
    this.myElement = null;
    // reference to the animation
    this.myTween = new TimelineLite({paused: true});
    // control the animation
    this.state = {
      status: 'pause',
      progress: 0,
    }

    this.handleSpeed = this.handleSpeed.bind(this);
    this.handleTogglePlay = this.handleTogglePlay.bind(this);
    this.handleReverse = this.handleReverse.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
  }

  componentDidMount(){
    this.myTween
      .to(this.myElement, 0.5, {x: 100})
      .to(this.myElement, 0.5, {y: 100, rotation: 90})
      .play();
  }

  handleSpeed(e) {
    const value = e.target.value;

    this.setState({
      progress: value,
    }, () => {
      this.myTween.progress(value/100).pause();
    })
  }

  handleTogglePlay() {
    if(this.state.status === 'play') {
      // Let's pause!
      this.myTween.pause();
      this.setState({
        status: 'pause',
      })
    } else {
      // Let's play : D
      if (this.myTween.progress() === 1 || (this.myTween.progress() === 0 && this.myTween.reversed())) {
        // the animation is over
        this.myTween.restart();
      } else {
        this.myTween.resume();
      }

      this.setState({
        status: 'play',
      })
    }
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

  render(){
    const label = this.state.status === 'play' ? 'pause' : 'play';

    return (
      <div className="gsap">
        <div className="canvas">
          <div ref={div => this.myElement = div} className="element">
            hello world
          </div>
        </div>
        <div className="controls">
          <input type="range" value={this.state.progress} onChange={this.handleSpeed}/>
          <button onClick={this.handleTogglePlay}>{label}</button>
          <button onClick={this.handleReverse}>reverse</button>
          <button onClick={this.handleRestart}>restart</button>
        </div>
      </div>
    );
  }
}

export default Timeline;
