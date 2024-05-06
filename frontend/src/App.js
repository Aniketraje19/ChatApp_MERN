import {RouterProvider,createBrowserRouter} from "react-router-dom"
import {Chats,Home} from "./pages/index.js"
import "./App.css"
const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>,
    errorElement:<h1>Page Not Found!</h1>,
  },
  {
    path:"/chats",
    element:<Chats/>
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
