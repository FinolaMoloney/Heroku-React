import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import '../components/Home.css';
import NourishAndSproutHomeImage from '../images/home/NourishAndSproutHomeImage.jpg';
import NourishAndSproutBabySoupAndVeg from '../images/home/NourishAndSproutBabySoupAndVeg.jpg';
import NourishAndSproutLogo from '../images/home/NourishAndSproutLogo.jpg';
import NourishAndSproutFreshVeg from '../images/home/NourishAndSproutFreshVeg.jpg';
import NourishAndSproutGlutenFreeImg from '../images/home/NourishAndSproutGlutenFreeImg.jpg';
import NourishAndSproutIcePops from '../images/home/NourishAndSproutIcePops.jpg';

function Home(){
    return(
        <div className="background">
            <div className="row banner">
                <h3 className="logoText col-sm-11">Welcome to Nourish and Sprout!</h3>
            </div>
            <div className="row">
                <div className="col-sm-10">
                    <Carousel>
                        <Carousel.Item>
                            <Link to='/products'>
                            <img
                            className="carousel-img"
                            src={NourishAndSproutHomeImage}
                            alt="NourishAndSproutImageOfFruitOnTable"
                            />
                            <Carousel.Caption className="carousel-text">
                            <h1 className="carousel-text">Nourish and Sprout</h1>
                            <h4 className="carousel-text">Click here to shop our delicious range of products.</h4>
                            </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Link to='/products'>
                            <img
                            className="carousel-img"
                            src={NourishAndSproutBabySoupAndVeg}
                            alt="NourishAndSproutBabySoupAndVeg"
                            />
                            <Carousel.Caption className="carousel-text">
                            <h1 className="carousel-text">Nourish and Sprout</h1>
                            <h4 className="carousel-text">Click here to shop our delicious range of products.</h4>
                            </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
            <div className="row card-links">
                <div className="card-body col-sm-3">
                    <Link to='/gluten-free'><h3>Find out more about our Coeliec Range here<br/><br/></h3>
                    <img className="card-text fruit-veg-img" src={NourishAndSproutGlutenFreeImg} alt="NourishAndSproutFreshVeg"/></Link>
                </div>
                <div className="card-body col-sm-3">
                    <Link to='/diary-free'><h3>Find out more about our diary free range here<br/><br/></h3>
                    <img className="card-text fruit-veg-img" src={NourishAndSproutFreshVeg} alt="NourishAndSproutFreshVeg" /></Link>
                </div>
                <div className="card-body col-sm-3">
                    <Link to='/products'><h3>Shop all products here<br/><br/></h3>
                    <img className="card-text fruit-veg-img" src={NourishAndSproutIcePops} alt="NourishAndSproutIcePops" /></Link>
                </div>
            </div>
        </div>
    )

}

export default Home;