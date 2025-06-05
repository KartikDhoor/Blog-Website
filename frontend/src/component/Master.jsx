import { Outlet } from "react-router-dom";
import Footer from "./layout/Footer";
import Header from "./layout/Header";

export default function Master(){
    return(
        <>
        <div className="overflow-x-hidden relative">
        <Header className='absolute'/>
        <Outlet/>
        <Footer/>
        </div>
        </>
    )
}