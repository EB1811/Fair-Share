import React from 'react'
import '../../App.css';

// React Router
import { Link } from 'react-router-dom';

const DistributeMainPage = () => {
    return (
        <div className="App">
             <h1>
                Distribute Main Page
            </h1>
            <Link to='/Distribute/Rent'>Distribute Rent</Link><br/>
            <Link to='/Distribute/Goods'>Distribute Goods</Link>
        </div>
    )
}

export default DistributeMainPage;
