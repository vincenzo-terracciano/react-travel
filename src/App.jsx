import { BrowserRouter, Route, Routes } from "react-router-dom"
import GlobalProvider from "./context/GlobalContext"
import DefaultLayout from "./layouts/DefaultLayout"
import Home from "./pages/Home"
import Travels from "./pages/Travels"
import TravelDetails from "./pages/TravelDetails"
import Itinerary from "./pages/Itinerary"
import Places from "./pages/Places"
import PackingItems from "./pages/PackingItems"
import Photos from "./pages/Photos"
import Wishlist from "./pages/Wishlist"


function App() {



  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={DefaultLayout}>
              <Route path="/" Component={Home} />
              <Route path="/travels" Component={Travels} />
              <Route path="/travels/:id" Component={TravelDetails}>
                <Route path="itinerary" Component={Itinerary} />
                <Route path="places" Component={Places} />
                <Route path="packing-items" Component={PackingItems} />
                <Route path="photos" Component={Photos} />
              </Route>
              <Route path="/wishlist" Component={Wishlist} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  )
}

export default App
