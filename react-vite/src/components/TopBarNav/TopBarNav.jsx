import './TopBarNav.css'
import vidaLogo from '../../assets/vidaLogo.png';
import {NavLink, useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {thunkLogout} from "../../redux/session.js";

const TopBarNav = () => {
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(thunkLogout())
    }

    return (
        <>
            <div id="top-bar-nav">
                <div id="top-bar-nav-content">
                    <img id='vida-logo-nav' src={vidaLogo} alt="vidaLogo" onClick={() => navigate("/")}/>
                    <div id="section-1">
                        <NavLink to='/menu'>Menu</NavLink>
                        <NavLink to='/'>Merch</NavLink>
                        <NavLink to='/'>About Us</NavLink>
                    </div>
                </div>
                <div id="section-2"></div>
                <div id='section-3'>
                    {currentUser ? (
                        <>
                            <button onClick={handleLogout}>Log Out</button>
                            <button onClick={() => navigate('/cart')}>Cart</button>
                            {currentUser.role === 'admin' &&
                                <button onClick={() => navigate('/menu/new')}>Add Product</button>}
                        </>
                    ) : (
                        <>
                            <button id='login-button' onClick={() => navigate('/login')}>Login</button>
                            <button id='join-button' onClick={() => navigate('/signup')}>Join Now</button>
                        </>
                    )}
                </div>
            </div>
            <hr id='test'/>

        </>
    );
}

export default TopBarNav;