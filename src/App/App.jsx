import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "root/_components.jsx";
import { Product } from "product/_components.jsx";
import { Pricing } from "pricing/_components.jsx";
import {
  AppLayout,
  City,
  CityList,
  CountryList,
  Form,
} from "app/_components.jsx";
import { Login } from "login/_components.jsx";
import { PageNotFound } from "utilities/_components.jsx";
import { CitiesProvider } from "contexts/_components.jsx";

function App() {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="cities" />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;
