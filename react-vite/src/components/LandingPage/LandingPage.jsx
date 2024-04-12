import './LandingPage.css'
import vidaLogo from '../../assets/vidaLogo.png';

const LandingPage = () => {
    return (
        <div className="landing-center-container">
            <img id='vida-logo' src={vidaLogo} alt="vidaLogo" />
            <h1 id='landing-title'>Vida e Caffe</h1>
            <button id='menu-button'>Order In-Store Pickup</button>
        </div>
    );
}

export default LandingPage;