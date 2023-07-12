import '../components/About.css';
import NourishAndSproutLogo from '../images/home/NourishAndSproutLogo.jpg';

function About(){
    return(
        <div className="container-fluid">
            <div className="row">
                <img className="logo col-sm-5 col-lg-3" src={NourishAndSproutLogo} alt="NourishAndSproutLogo" />
                <h1 className="logo-text col-sm-7 col-lg-9">Want to find out more about Nourish and Sprout?</h1>
            </div>
            <div className="row">
                <h3>OUR STORY</h3>
                <div className="col">
                    <p>
                        Nourish and Sprout began as 
                    </p>
                </div>
                <div className="col">
                    <p>
                        Insert image
                    </p>
                </div>
                <div className="col">
                    <p>May 2023 - The Nourish and Sprout journey begins.</p>
                    <p className="dash">|<br/>|<br/></p>
					<p>August 2023 - We expanded our reach with the launch of our website. You can now find out more about us online and reach us easily!</p>
					<p className="dash">|<br/>|<br/></p>
					<p>December 2023 - We plan to stock our products in stores around Ireland.</p>
					<p className="dash">|<br/>|<br/></p>
					<p>When will your journey with Nourish and Sprout begin?</p>
                </div>
            </div>
            <div className="row">
                <h3>FAQ</h3>
                <h6>What can we do if we have an issue with our order?</h6>
                <p>If you experience any issues with your order please reach out to us. You can fill in the contact form provided and some one from the team will get back to as soon as possible.</p>
            </div>
        </div>
    )

}

export default About;