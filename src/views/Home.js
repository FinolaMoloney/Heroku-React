import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import '../components/Home.css';
import NourishAndSproutBabyEatingPepper from '../images/home/NourishAndSproutBabyEatingPepper.jpg';
import NourishAndSproutBabySoupAndVeg from '../images/home/NourishAndSproutBabySoupAndVeg.jpg';
import NourishAndSproutLogo from '../images/home/NourishAndSproutLogo.jpg';
import NourishAndSproutFreshVeg from '../images/home/NourishAndSproutFreshVeg.jpg';

function Home(){
    return(
        <div>
            <div className="row banner">
                <img className="logo col-sm-1" src={NourishAndSproutLogo} alt="NourishAndSproutLogo" />
                <h1 className="logoText col-sm-11">Welcome to Nourish and Sprout!</h1>
            </div>
            <div className="row">
                <Carousel>
                    <Carousel.Item>
                        <img
                        className="carousel-img"
                        src={NourishAndSproutBabyEatingPepper}
                        alt="NourishAndSproutBabyEatingPepper"
                        />
                        <Carousel.Caption className="carousel-text">
                        <h3>Nourish and Sprout</h3>
                        <p>Click here to shop our delicious range of products.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="carousel-img"
                        src={NourishAndSproutBabySoupAndVeg}
                        alt="NourishAndSproutBabySoupAndVeg"
                        />
                        <Carousel.Caption className="carousel-text">
                        <h3>Nourish and Sprout</h3>
                        <p>Click here to shop our delicious range of products.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
            <div className="row card-links">
                <div className="card-body col-sm-3 col-lg-3">
                    <Link to='/gluten-free'><h3 className="card-title">Find out more about our Coeliec Range here<br/><br/></h3>
                    <img className="card-text fruit-veg-img" src={NourishAndSproutFreshVeg} alt="NourishAndSproutFreshVeg"/></Link>
                </div>
                <div className="card-body col-sm-3 col-lg-3">
                    <Link to='/diary-free'><h3 className="card-title">Find out more about our diary free range here<br/><br/></h3>
                    <img className="card-text fruit-veg-img" src={NourishAndSproutFreshVeg} alt="NourishAndSproutFreshVeg" /></Link>
                </div>
                <div className="card-body col-sm-3 col-lg-3">
                    <Link to='/products'><h3 className="card-title">Shop all products here<br/><br/></h3>
                    <img className="card-text fruit-veg-img" src={NourishAndSproutFreshVeg} alt="NourishAndSproutFreshVeg" /></Link>
                </div>
            </div>
        </div>
    )

}

export default Home;