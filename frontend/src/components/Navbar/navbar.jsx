import {Link} from "react-router-dom"
import header from "./navbar.module.scss"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUser, faCartShopping  } from '@fortawesome/free-solid-svg-icons';

function Heading () {
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
                    <li>
                        <Link to="/shop" className={header.header__link}>SHOP</Link>
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
                    <li><FontAwesomeIcon icon={faCartShopping} className={header.icon}/> </li>
                </ul>
                
            </div>
            
        </div>
    );
}

export default Heading;