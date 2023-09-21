import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "root/_components.jsx";
import { Product } from "product/_components.jsx";
import { Pricing } from "pricing/_components.jsx";
import { AppLayout, CityList } from "app/_components.jsx";
import { Login } from "login/_components.jsx";
import { PageNotFound } from "utilities/_components.jsx";
import { useGetCities } from "hooks/_components.jsx";

function App() {
  const { cities, isLoading } = useGetCities();

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route
            index
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path="countries" element={<p>Countries</p>} />
          <Route path="form" element={<p>Form</p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
