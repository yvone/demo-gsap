import React from 'react';
import { ImageWithActions } from 'spoton-lib';
import GsapComponent from './gsapComponent.js';

import './actions.css';

class Actions extends React.Component {
    render() {
        const actions = [
            {
                title: "Crop",
                iconName: "CropIcon",
                iconAlt: "crop",
                onClick: () => alert(`Cropping clicked`),
            },
            {
                title: "Cover",
                iconName: "PinIcon",
                iconAlt: "set as cover",
                onClick: () => alert(`Cover clicked`),
            },
            {
                title: "Delete",
                iconName: "DeleteIcon",
                iconAlt: "delete",
                onClick: () => alert(`Delete clicked`),
            },
        ];

        return (
            <div className="row">
                <div className="component">
                    <h1>GSAP</h1>
                    <GsapComponent
                        className="small"
                        actions={actions}
                        imgUrl="https://source.unsplash.com/250x250/?shoes"
                        imgAlt="shoes"
                    />
                </div>
                <div className="component">
                    <h1>SPOTON LIB</h1>
                    <ImageWithActions
                        className="small"
                        actions={actions}
                        imgUrl="https://source.unsplash.com/250x250/?shoes"
                        imgAlt="shoes"
                    />
                </div>
            </div>
        )
    }
}

export default Actions;
