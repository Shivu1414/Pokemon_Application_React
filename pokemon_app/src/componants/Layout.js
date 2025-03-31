import {useNavigate } from "react-router-dom";
const Layout = ({cart}) => {
    const navigat = useNavigate();

    const homePage = () =>{
        navigat('/');
    }

    const cartpage = () =>{
        navigat('/cart');
    }

    return (
        <div className="pokemon-header navbar navbar-expand-lg row">
            <div className="col-md-4">
                 <img src="/nav_logo.jpeg" alt="image" className="nav-logo" />
            </div>
             
            <div className="col-md-4 nav-text-div">
                <h2 className="nav-name" onClick={homePage}>Pokemon</h2>
            </div>

            <div className="col-md-4 nav-cart-div">
                <h2 className="nav-cart" onClick={cartpage}><span className="cart-txt">Cart <span>{cart.length}</span></span></h2>
            </div>
        </div>
    )
}

export default Layout;