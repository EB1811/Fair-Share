import React from 'react'

// Router
import { NavLink, withRouter } from 'react-router-dom'

// Bootstrap Components
import Nav from 'react-bootstrap/Nav'

// Redux
import { connect } from 'react-redux'
// rrf
import { useFirebase } from 'react-redux-firebase'

const SignedInLinks = (props) => {
    const firebase = useFirebase()
    const userLetter = props.profile.username ? props.profile.username : ''

    const logout = () => {
        setTimeout(() => {
            props.setExpanded(false)
        }, 50)
        firebase.logout().then(() => {
            props.logoutSuccess()
        })
        props.history.push('/')
    }

    if (userLetter) {
        return (
            <Nav className='justify-content-end' style={{ flex: 1 }}>
                <span style={{ padding: '10px 0 10px 0px', color: '#fff' }}>
                    |
                </span>
                <Nav.Item>
                    <NavLink
                        className='nav-link'
                        style={{
                            padding: '10px 15px 10px 15px',
                            textDecoration: 'none',
                            transition: '0.2s',
                        }}
                        to='/Account'
                        onClick={() =>
                            setTimeout(() => {
                                props.setExpanded(false)
                            }, 50)
                        }
                    >
                        {userLetter}
                    </NavLink>
                </Nav.Item>
                <Nav.Item>
                    <span
                        onClick={logout}
                        className='nav-link'
                        style={{
                            cursor: 'pointer',
                            padding: '10px 15px 10px 15px',
                            transition: '0.2s',
                        }}
                    >
                        Logout
                    </span>
                </Nav.Item>
            </Nav>
        )
    } else {
        return null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoutSuccess: () => {
            dispatch({ type: 'LOGOUT_SUCCESS' })
        },
    }
}

export default withRouter(connect(null, mapDispatchToProps)(SignedInLinks))
