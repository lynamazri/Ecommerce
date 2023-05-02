import React from "react"
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import UserNavbar from "../../components/UserNavbar/UserNavbar";
import Footer from "../../components/Footer/Footer";
import Product from "../../components/Product/Product";

import "./ProductDetails.css"


export default function ProductDetails() {

    const handleAdd = () => {
        
      };

    return (
        <>
            <UserNavbar /> 
            <main>
                <div className="container">
                    <div className="path">
                        <small>Homepage / Electronics / iPhone 14 pro max</small>
                    </div>
                    <div className="flexContainer">
                        <section className="photos">
                            <div className="photo">
                                <img></img>
                                <span>- 36 %</span>
                                <span>Free shipping</span>
                            </div>
                            <div className="photo">
                                <img></img>
                            </div>
                            <div className="photo">
                                <img></img>
                            </div>
                        </section>
                        <section className="info">
                            <div className="title">
                                <h3>iPhone 14 pro max</h3>
                                <div className="reviewStars">

                                    <small>(12 customer review)</small>
                                </div>
                            </div>
                            <div className="description">
                                <p>Carrots from Tomissy Farm are one of the best on 
                                    the market. Tomisso and his family are giving a 
                                    full love to his Bio products. Tomisso’s carrots
                                    are growing on the fields naturally.
                                </p>
                            </div>
                            <div className="informationContainer">
                                <div className="information">
                                    <div className="detailsTitle">
                                        <ul className="detailTitleList">
                                            <li>SKU:</li>
                                            <li>Category:</li>
                                            <li>Stock:</li>
                                            <li>Store:</li>
                                        </ul>
                                    </div>
                                    <div className="detailsValue">
                                        <ul className="detailValueList">
                                            <li>76645</li>
                                            <li>Electronics</li>
                                            <li>Stock</li>
                                            <li>Apple dz</li>
                                        </ul>
                                    </div>
                                    
                                </div>
                                <div className="information">
                                    <div className="detailsTitle">
                                        <ul className="detailTitleList">
                                            <li>Freshness:</li>
                                            <li>Delivery:</li>
                                        </ul>
                                    </div>
                                    <div className="detailsValue">
                                        <ul className="detailValueList">
                                            <li>1 day old</li>
                                            <li>in 2 days</li>
                                        </ul>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="addToCart">
                                <div className="price">
                                    <p>1,329 USD</p>
                                    <small>1500 USD</small>
                                </div>

                                <div className="buttons">
                                    <div className="qte">
                                        <div>
                                            
                                            <p>1 | pcs <span><MdKeyboardArrowDown /></span></p>
                                        </div>
                                        
                                    </div>
                                    <div className="addToCartButton">
                                        <button onClick={() => handleAdd()}>
                                            + Add To Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <span>Add to my wish list</span>
                                <span>Compare</span>
                            </div>
                            <div>
                                <button>Description</button>
                                <button>Reviews</button>
                                <button>Questions</button>
                            </div>
                        </section>
                    </div>
                    <div className="relatedProducts">
                        <div className="h3Container">
                            <h3>Related products</h3>
                            <h3>More products <span><MdKeyboardArrowRight /></span></h3>
                        </div>
                        <div className="productWrapper"></div>
                        <Product />
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}