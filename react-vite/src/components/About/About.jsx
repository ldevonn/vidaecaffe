import './About.css'
import {NavLink} from "react-router-dom";

function About () {

    return (
        <>
            <div className='main'>
                <div className='about-container'>
                    <div id='about-wrapper'>
                        <h2 id={'about-name'}>Lars-Devon Nilsson</h2>
                        <NavLink id={'about-github'} to={'https://github.com/ldevonn'}>Github</NavLink>
                        <NavLink id={'about-linkedin'} to={'https://www.linkedin.com/in/lars-devon-nilsson-1989781b0'}>Linkedin</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About
