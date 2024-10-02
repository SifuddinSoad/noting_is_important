import { useState } from "react";
import { Navbar } from "../Navbar"
import { Sidebar } from "./Sidebar"

type LayoutProps = {
    children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [windowS, setWindowS] = useState(false);
    return (
        <main className="md:p-5 w-full max-w-7xl mx-auto">
            <Navbar />
            <div className="flex md:mt-5">
                <Sidebar window={windowS} />
                <section className="w-full max-w-5xl mx-auto p-3 sm:p-4 md:px-8 md:py-0 mb-24" onClick={() => setWindowS(!windowS)}>
                    {children}
                </section>
            </div>
        </main>
    )
}
