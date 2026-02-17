import {Link} from "react-router-dom"
import { CartContext } from "../../features/ContextProvider";
import header from "./navbar.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUser, faCartShopping, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useContext } from "react";

function Heading () {
    const {cart} = useContext(CartContext)
    return (
        <div className={header.header}>
            <div className={header.header__logo}>
                <img src="/image.png" alt="" />
            </div>
            <div className={`${header['header__main-nav']}`}>
                <ul className={header.header__list}>
                    <li>
                        <Link to="/" className={header.header__link}>HOME</Link>
                    </li>
                    <li className={header["header__link-shop"]}>
                        <Link to="/shop" >SHOP </Link>
                        <FontAwesomeIcon icon={faChevronDown} style={{width: '15px', height:'15px', marginLeft:'7px'}} />

                        <ul className={header["link__shop-list"]}>
                            <li>
                                <Link to="/shop/espresso-machine">ESPRESSO MACHINE</Link>
                            </li>
                            <li>
                                <Link to="/shop/grinder-machine">GRINDER MACHINE</Link>
                            </li>
                            <li>
                                <Link to="/shop/coffee-beans">COFFEE BEANS</Link>
                            </li>
                            <li>
                                <Link to="/shop/accessories">ACCESSORIES</Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/warranty" className={header.header__link}>WARRANTY</Link>
                    </li>
                     <li>
                        <Link to="/contact" className={header.header__link}>CONTACT</Link>
                    </li>
                    
                </ul>
            </div>
            <div className={`${header['header__secondary-nav']}`}>
                <ul>
                    <li><FontAwesomeIcon icon={faUser} className={header.icon} /></li>
                    <li><FontAwesomeIcon icon={faMagnifyingGlass} className={header.icon} /></li>
                    <li>
                        <Link>
                            <div className={header.iconWrapper}>
                                <FontAwesomeIcon icon={faCartShopping} className={header.icon} />
                                <span className={header.badge}>{cart.length}</span>
                            </div>
                        </Link>
                    </li>
                        
                </ul>
                
            </div>
            
        </div>
    );
}

export default Heading;