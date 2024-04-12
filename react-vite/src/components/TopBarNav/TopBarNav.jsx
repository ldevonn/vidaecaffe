import './TopBarNav.css'
import vidaLogo from '../../assets/vidaLogo.png';
import {NavLink, useNavigate} from "react-router-dom";

const TopBarNav = () => {
    const navigate = useNavigate();
    return (
        <>
            <div id="top-bar-nav">
                <img id='vida-logo-nav' src={vidaLogo} alt="vidaLogo" onClick={() => navigate("/")}/>
                <NavLink to='/'>Menu</NavLink>
                <NavLink to='/'>Merch</NavLink>
                <NavLink to='/'>About Us</NavLink>
                <div id='login-join'>
                    <button id='login-button' onClick={() => navigate('/login')}>Login</button>
                    <button id='join-button' onClick={() => navigate('/signup')}>Join Now</button>
                </div>
            </div>
            <hr id='test'/>

        </>
    );
}

export default TopBarNav;