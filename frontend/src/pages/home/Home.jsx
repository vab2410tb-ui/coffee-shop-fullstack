import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp,  } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import { SlideData, BeansData, AccData, ExploreData, BlogData } from '../../data/products.jsx'  
import home from './home.module.scss'


function ProductPriceInfo() {
    const [curIndex, setCurIndex] = useState(0)
    const [autoMoving, setAutoMoving] = useState(false)

    // const btnPre = () => {
    //     const firstSlide = curIndex === 0;
    //     const newSlide = firstSlide ? SlideData.length - 1 : curIndex -1;
    //     setCurIndex(newSlide); 
    // };

   
    
    // Click DOT
    const moving = (index) => {
        if(autoMoving) return;
        setCurIndex(index);
        setAutoMoving(true);

        setTimeout(() => {
            setAutoMoving(false)

        }, 500)

    }

    // Auto Moving
    useEffect(() => {
        const btnNxt = () => {
        const lastSlide = curIndex === SlideData.length - 1;
        const newSlide = lastSlide ? 0 : curIndex +1;
        setCurIndex(newSlide); 
    };
        const timer = setTimeout(() => {
            btnNxt();
        }, 5000); 
        return () => clearTimeout(timer);
    }, [curIndex]);
    
        
    

    return (
        <>
        <div className={home.container} style={{'--current-index': curIndex}}>
            {/* ========== MOTION PROCESSING ==========  */}
            <div className={home.sliderWrapper}>
                {SlideData.map((item , index) =>(
                        <div className={home.banner} key={index} >
                            <img src={item.src} alt="" />
                            <div className={home.title}>
                                <h2>{item.title}</h2>
                                <h3>{item.title2}</h3>
                                <button>{item.btn}</button>
                            </div>
                        </div>   
                ))}
            </div>
            <div className={home.dots}>
                {SlideData.map((_ , index) => (
                        <button
                            key={index}
                            onClick={() => {moving(index)}}
                            className={`${home.dot} ${index === curIndex ? home.active : ""}`}
                        >
                        </button>
                    ))} 
            </div>
            {/* ========== END MOTION PROCESSING ========== */}
        </div>
        

        {/* BEGIN sections: Intro products */}
        <div className={home.introprd}>
            {/* SECTION ONE */}
            <section className={`${home['introprd__section-1']}`}>
                <div className={home.card}>
                    <img 
                        src="https://res.cloudinary.com/drrao1nzd/image/upload/v1770301901/nab_coffee/products/main/cgzsdjzp9ghkuz612v0k.jpg" 
                        alt="CF at home"
                    /> 
                    <h2>Coffee At Home</h2>
                    <p>View our products</p>
                    <span>
                        <FontAwesomeIcon icon={faArrowUp} />
                    </span>
                </div>

                <div>
                    <div className={home.wrapper}>
                        <img 
                        src="https://res.cloudinary.com/drrao1nzd/image/upload/v1770301441/nab_coffee/products/main/j6uqabnuweyaf1cyzwci.jpg" 
                        alt="Micra" 
                    />
                    </div>
                    <h3>Linea Micra</h3>
                    <p>103.000.000 VND</p>
                </div>
                <div>
                    <div className={home.wrapper}>
                        <img  
                        src="https://res.cloudinary.com/drrao1nzd/image/upload/v1770301446/nab_coffee/products/main/mp6mryfctrpnfkd1mt22.jpg" 
                        alt="Mini" 
                    />
                    </div>
                    <h3>Linea Mini</h3>
                    <p>130.000.000 VND</p>
                </div>      
            </section>

            {/* SECTION TWO */}
            <section className={`${home['introprd__section-1']}`}>
                <div className={home.card}>
                    <img 
                        src="https://res.cloudinary.com/drrao1nzd/image/upload/v1770301903/nab_coffee/products/main/jijdijhhqqql2fqmxp87.jpg" 
                        alt="New up"
                    /> 
                    <h2>New up Shelves</h2>
                    <p>View our products</p>
                    <span>
                        <FontAwesomeIcon icon={faArrowUp} />
                    </span>
                </div>

                <div>
                    <div className={home.wrapper}>
                        <img 
                        src="https://res.cloudinary.com/drrao1nzd/image/upload/v1770433053/nab_coffee/products/main/d1yy0gnw6w4ucp1ulcvd.jpg" 
                        alt="Pico" 
                        />
                        <span>NEW</span>
                    </div>
                    <h3>Linea Micra</h3>
                    <p>103.000.000 VND</p>
                </div>
                <div>
                    <div className={home.wrapper}>
                        <img  
                        src="https://res.cloudinary.com/drrao1nzd/image/upload/v1770433058/nab_coffee/products/main/dvaxzrwqgkkwb9udriz9.jpg" 
                        alt="LevaX1" 
                    />
                    <span>NEW</span>
                    </div>
                    <h3>Linea Mini</h3>
                    <p>130.000.000 VND</p>
                </div>      
            </section>

            {/* SECTION THREE */}
            <section className={`${home['introprd__section-2']}`}>
                <div className={home.line}></div>
                <h2>COFFEE BEANS</h2>
                <div className={home.cardbeans}>
                    {BeansData.map((item, index) => (
                        <div className={home.card} key={index}>
                            <div>
                                <img src={item.src} alt="" />
                            </div>
                            <h3>{item.title}</h3>
                            <p>{item.price}</p>
                        </div>
                    ))}
                </div>
                <div className={home.line}></div>
            </section>

            {/* SECTION FOUR */}
            <section className={`${home['introprd__section-2']}`}>
                <h2>COFFEE BEANS</h2>
                <div className={home.cardbeans} >
                    {AccData.map((item, index) => (
                        <div className={home.card} key={index}>   
                            <div>
                                <img src={item.src} alt="" />
                            </div>
                            <h3>{item.title}</h3>
                            <p>{item.price}</p>
                        </div>
                    ))}
                </div>
                <div className={home.line}></div>
            </section>
        </div>
        {/* END sections: Intro products */}    
        
        {/* BEGIN sections: EXPOLORE  */}
        <div className={home.explore}>
            <h2>EXPLORE #NABCOFFEESHOP</h2>
            <div className={home.girdlayout}>
                {ExploreData.map((item, index) => (
                    <img src={item.src} alt={`Coffee product ${index}`} key={index} />
                
                ))}
            </div>
        </div>  
        {/* END sections: EXPOLORE  */}

        {/* START sections: BLOG  */}
        <div className={home.blog}>
            <div className={home.line}></div>
            <h2>BLOG POST</h2>
            <div className={home.blog__card}>
                {BlogData.map((item, index) => (
                    <div key={index}>
                        <img src={item.src} alt="" />
                        <p><FontAwesomeIcon icon={faCalendar} /> {item.date}</p>
                        <p>{item.title}</p>
                    </div>
                ))}
            </div>
        </div>
        {/* END sections: BLOG  */}     
        </>
            
    );
}

export default ProductPriceInfo;