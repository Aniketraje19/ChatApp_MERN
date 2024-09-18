import {RouterProvider,createBrowserRouter} from "react-router-dom"
import {Chats,Home,AuthPage} from "./pages/index.js"
import { ProtectedRoute } from "./components/ProtectedRoute.jsx"
import "./App.css"
const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>,
    errorElement:<h1>Page Not Found!</h1>,
  },
  {
    path:"/chats",
    element:<ProtectedRoute children={<Chats/>} />
  },
  {
    path:"/auth",
    element:<AuthPage/>
  }
])

function App() {

  return (
    <div className="App">
    <RouterProvider router={router}/>
    </div>
  );
}

export default App;
