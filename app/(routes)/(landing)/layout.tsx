import { Navbar } from "@/components/navbar"
import { ReactNode } from "react"


const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Navbar />
            <section className="mt-16">
                {children}
            </section>
        </>
    )
}

export default Layout