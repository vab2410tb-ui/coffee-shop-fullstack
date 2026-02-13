import { Link } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp,  } from '@fortawesome/free-solid-svg-icons';
import footer from './footer.module.scss'


function Footer () {
    return (
        <footer>
            <div>
                <h2>SHOP</h2>
                <ul>
                    <Link to="">Espresso Machine</Link>
                    <Link>Grinder Machine</Link>
                    <Link>Accessories</Link>
                    <Link>Coffee Beans</Link>
                </ul>
            </div>
            <div>
                <h2>SUPPORT</h2>
                <ul>
                    <Link to="">Team of Use</Link>
                    <Link>Delivery Policy</Link>
                    <Link>Return Policy</Link>
                    <Link>Warranty</Link>
                </ul>
            </div>
            <div>
                <h2>EXPLORE</h2>
                <ul>
                    <Link to="">About Us</Link>
                    <Link>Blog</Link>
                    <Link>Contact Us</Link>
                </ul>
            </div>
            <div>
                <h2>CONTACT</h2>
                <ul>
                    <li>1900 393 979</li>
                    <li>nabcfshop@gmail.com</li>
                </ul>
            </div>
            <div className={footer.info}>
                <h2>NABCoffeeShop</h2>
                <h3>Subscribe to the newsletter</h3>
                <div className={footer.fill}>
                    <input type="text" placeholder='Enter your email'/>
                    <FontAwesomeIcon icon={faArrowUp} className={footer.icon} />
                    <h3>Natural And Blance Joint Stock Company</h3>
                    <ul>
                        <li>Business Registration Certificate: 0101993086</li>
                        <li>Issuing agency: Department of Planning and Investment of Dong Nai</li>
                        <li>Issued date: 10/10/2020</li>
                        <li>Address: N1 (Street), Trang Dai Ward, Dong Nai, Viet Nam</li>
                    </ul>
                    <img src="https://res.cloudinary.com/drrao1nzd/image/upload/v1770628302/footer_icon_dlqiid.jpg" alt="" />
                </div>
                
            </div>
        </footer>
    );
}

export default Footer;