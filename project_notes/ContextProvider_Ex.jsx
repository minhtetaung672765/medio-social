import { createContext, useContext } from "react";

// create a context as a provider
const AppContent = createContext();

export default function TestApp() {

    // the provider has a context value
    return <AppContent.Provider value="Amazon Company LTD">
        {/* the value is passed to the Homepage, 
        any components within it can access the context */}
        <Homepage />
    </AppContent.Provider>
}

// Home page has Header and Footer under 
function Homepage() {
    return <div>
        <Header />
        <Footer />
    </div>
}

function Header() {
    // Since the Header is under HomePage, it can use the context
    const title = useContext(AppContent);

    return <h1> {title} </h1>
}

function Footer() {
    // Since the Footer is under HomePage, it can use the context
    const title = useContext(AppContent);

    return <footer> {title} | Copyright 2024 </footer>
}
