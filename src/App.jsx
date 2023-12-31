import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";
import Details from "./pages/Details";
import ScanQR from "./pages/ScanQr";


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<ScanQR />} />
      <Route path="form" element={<Details />} />
    </Route>
  )
)
