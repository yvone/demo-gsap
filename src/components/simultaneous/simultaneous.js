import React from 'react';
import { TweenLite, Elastic } from 'gsap';
import './simultaneous.css';

class Simultaneous extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      rotation: 0,
    }

    this.myElement = null;

    this.handleHover = this.handleHover.bind(this);
  }

  handleHover(e) {
    this.setState((prevState) => {
      return {rotation: prevState.rotation === 0 ? 360 : 0};
    }, () => {
      TweenLite.to(this.myElement, 2, {
        rotation:this.state.rotation,
        ease:Elastic.easeOut
      })
    })
  }

  componentDidMount() {
    TweenLite.to(this.myElement, {
      duration: 1.2,
      scaleX:0.8,
      scaleY:0.8,
      force3D:true,
      yoyo:true,
      repeat:-1,
      ease: "power1.inOut"
    });
  }

  render() {
    return (
      <div className="App">
        <div
          ref={div => this.myElement = div}
          className="element"
          onMouseOver={this.handleHover}
        >
          hello world
        </div>
      </div>
    );
  }
}

export default Simultaneous;
