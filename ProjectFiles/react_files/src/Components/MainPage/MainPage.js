import React from 'react'
import '../../App.css';

// React Router
import { Link } from 'react-router-dom';

const MainPage = () => {
    return (
        <div className="App">
             <h1>
                CE301 Project
            </h1>
            <Link to='/Learn'>Learn</Link><br/>
            <Link to='/Distribute'>Distribute</Link>
        </div>
    )
}

export default MainPage;
