import shop from './shop.module.scss'
import Header from '../../components/Navbar/navbar.jsx'
import Footer from '../../components/Footer/Footer.jsx'

function Shop () {
    return (
        <>
        <Header/>
        <div className={shop.container}>
            <section className={shop.banner}>
                <h1>SHOP</h1>
            </section>
            <div className={shop.card}>
                
            </div>
        </div>
        <Footer/>
        </>

    )
}

export default Shop