import '../components/About.css';
import NourishAndSproutLogo from '../images/home/NourishAndSproutLogo.jpg';

function About(){
    return(
        <div>
            <div className="row banner">
                <h3>ABOUT US</h3>
            </div>
            <div className="container-fluid">
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
                    <div className="col">
                        <h3>FAQ</h3>
                        <div className="card">
                            <h6>What can we do if we have an issue with our order?</h6>
                            <div className="card-body faq-card">
                                <p>If you experience any issues with your order please reach out to us. You can fill in the contact form provided and some one from the team will get back to as soon as possible.</p>
                            </div>
                            <h6>How much is delivery?</h6>
                            <div className="card-body faq-card">
                                <p>Republic of Ireland (next day delivery*): €9.00 <br/>Northern Ireland (1-2 working days*): €9.00 <br/>Northern Ireland (next day delivery*): €12.00</p><small><br/>*to avail of next day delivery the order must be made by 1pm. Delivery for all parcels is only Monday-Friday.</small>
                            </div>
                        </div>
                    </div>
                </div><br/>
            </div>
        </div>
    )

}

export default About;