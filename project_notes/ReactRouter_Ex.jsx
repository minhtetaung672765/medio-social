
import { createBrowserRouter, Outlet, RouterProvider, useParams } from "react-router-dom";

// Navigation
//  Link - component
// useNavigate - function
import { Link, useNavigate } from "react-router-dom";

// create routes first
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/about",
        element: <About />,
    },
    {
        path: "/contact",
        element: <Contact />,
    },
    // Dynamic URL
    {
        path: "/profile/:id",
        element: <Profile />
    }

]);

const navigate = useNavigate();

// Apply the routes by a router provider component 
function App() {
    return <RouterProvider router={router}>
        <h1>blah...</h1>

        {/* Router navigation elements */}
        <Link to="/">Home</Link>
        <button onClick={() => navigate("/contact")}>Contact Now</button>
    </RouterProvider>;
}

function Profile() {
    const { id } = useParams();
    return <div>
        <h1> Your id : {id} </h1>
    </div>
}

// ------------------------------------------------------------------------------
// Templete or Nested Route - using Outlet

const nestedRoute = createBrowserRouter([
    {
        path: "/",
        element: <Template />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/contact",
                element: <Contact />,
            }
        ]
    }
]);

function Template() {
    return <div>
        <h1>Hello </h1>
        {/* the children will be displayed in "Outlet" */}
        <Outlet />
    </div>
}

