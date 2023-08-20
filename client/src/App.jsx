import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Navbar from "./components/navBar";
import RightBar from "./components/rightBar";
import Single from "./pages/Single";
import Publish from "./pages/Publish";
import Simulate from "./pages/Simulate";

function App() {
  const Layout = () => {
    return (
      <div>
        <Navbar />
        <div className="flex bg-slate-300">
          <Outlet />
          <RightBar />
        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/single/:id",
          element: <Single />,
        },
        {
          path: "/publish",
          element: <Publish />,
        },
        {
          path: "/simulate",
          element: <Simulate />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
