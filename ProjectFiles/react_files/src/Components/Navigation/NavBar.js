import React from 'react'

// React Router
import { Link } from 'react-router-dom';

const MainPage = () => {
    return (
        <div className="absoluteNavContainer">
        <div className="absoluteNavCenter">
            <svg height="100">
                <line x1="50%" y1="0" x2="50%" y2="300" style={{stroke: "#ffffff", strokeWidth: 1.5}} />
            </svg>
            <div>Link 1</div>
            <svg height="50">
                <line x1="50%" y1="0" x2="50%" y2="100" style={{stroke: "#ffffff", strokeWidth: 1.5}} />
            </svg>
            <div>Link 2</div>
            <svg height="50">
                <line x1="50%" y1="0" x2="50%" y2="100" style={{stroke: "#ffffff", strokeWidth: 1.5}} />
            </svg>
            <div>Link 3</div>
            <svg height="250">
                <line x1="50%" y1="0" x2="50%" y2="500" style={{stroke: "#ffffff", strokeWidth: 1.5}} />
            </svg>
        </div>
        </div>
    )
}

export default MainPage;
