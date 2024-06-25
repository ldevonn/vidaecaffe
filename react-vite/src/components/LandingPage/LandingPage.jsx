import './LandingPage.css'
import vidaLogo from '../../assets/vidaLogo.png';
import {useNavigate} from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate()
    return (
        <div className="landing-center-container">
            <img id='vida-logo' src={vidaLogo} alt="vidaLogo" />
            <h1 id='landing-title'>Vida e Caffe</h1>
            <button id='menu-button' onClick={() => navigate('/menu')}>Order In-Store Pickup</button>
        </div>
    );
}

export default LandingPage;