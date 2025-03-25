import { Outlet } from "react-router-dom";
import Footer from "./layout/Footer";
import Header from "./layout/Header";

export default function Master(){
    return(
        <>
        <div className="overflow-x-hidden p-0 m-0">
        <Header />
        <Outlet/>
        <Footer/>
        </div>
        </>
    )
}