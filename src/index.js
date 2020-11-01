import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Simultaneous from './components/simultaneous';
import Timeline from './components/timeline';
import ImageWithActions from './components/imageWithActions';

import './index.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom';

const routes = [
    {
        path: '/',
        exact: true,
        render: (props) => <div>GSAP</div>
    },
    {
        path: '/simultaneous',
        exact: true,
        render: (props) => <Simultaneous {...props} />
    },
    {
        path: '/actions',
        exact: true,
        render: (props) => <ImageWithActions {...props} />
    },
    {
        path: '/timeline',
        exact: true,
        render: (props) => <Timeline {...props} />
    },
];

ReactDOM.render(
    <Router>
        <nav className="animations">
            <Link to="/timeline" className="link">
                Timeline
            </Link>
            <Link to="/simultaneous" className="link">
                Simultaneous animations
            </Link>
            <Link to="/actions" className="link">
                ImageWithActions component
            </Link>
        </nav>

        <Switch>
            {routes.map(route => {
                return (
                    <Route
                        key={route.path}
                        {...route}
                    />
                )
            })}
        </Switch>
    </Router>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
