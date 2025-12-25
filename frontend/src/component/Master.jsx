import { Outlet } from "react-router-dom";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import ScrollToTop from "./layout/ScrollToTop";

export default function Master(){
    return(
        <>
        <ScrollToTop/>
        <div className="overflow-x-hidden relative">
        <Header className='absolute'/>
        <Outlet/>
        <Footer/>
        </div>
        </>
    )
}