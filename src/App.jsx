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
import Destinations from "./pages/Destinations"
import AboutUs from "./pages/AboutUs"
import Contacts from "./pages/Contacts"
import Terms from "./pages/Terms"
import Careers from "./pages/Careers"
import Partnership from "./pages/Partnership"
import Faq from "./pages/Faq"
import Assistance from "./pages/Assistance"
import CustomerCare from "./pages/CustomerCare"
import Help from "./pages/Help"


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
              <Route path="/destinations" Component={Destinations} />
              <Route path="/about-us" Component={AboutUs} />
              <Route path="/contacts" Component={Contacts} />
              <Route path="/terms" Component={Terms} />
              <Route path="/careers" Component={Careers} />
              <Route path="/partnership" Component={Partnership} />
              <Route path="/faq" Component={Faq} />
              <Route path="/assistance" Component={Assistance} />
              <Route path="/customer-care" Component={CustomerCare} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  )
}

export default App
