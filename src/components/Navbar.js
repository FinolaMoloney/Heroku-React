import { Link } from 'react-router-dom';
import './Navbar.css';
import NourishAndSproutBasket from '../images/home/NourishAndSproutBasket.jpg';
import NourishAndSproutSmallLogo from '../images/home/NourishAndSproutSmallLogo.jpg';

function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-sm">
                <div className="d-flex logoTop" >
                    <img className="img-fluid" src={NourishAndSproutSmallLogo} width="100" height="100" alt="NourishAndSproutLogo" />
                </div>
                <a className="navbar-brand" href="/">Nourish and Sprout</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-link">About Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/products" className="nav-link">Shop</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contact" className="nav-link">Contact Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/signup" className="nav-link">Signup</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/cart" className="nav-link"><img className="cart-image" src={NourishAndSproutBasket} alt="NourishAndSproutBasket" /></Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <header className="headerBanner" id="back">
                <h1>NOURISH AND SPROUT</h1>
            </header>
        </div>
    );
  }
    
    export default Navbar;