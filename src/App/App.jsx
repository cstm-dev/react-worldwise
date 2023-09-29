import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  City,
  CityList,
  CountryList,
  Form,
  ProtectedRoute,
} from "app/_components.jsx";
import { SpinnerFullPage } from "utilities/_components.jsx";
import { AuthProvider, CitiesProvider } from "contexts/_components.jsx";

const Home = lazy(() => import("root/Home/Home.jsx"));
const Product = lazy(() => import("product/Product/Product.jsx"));
const Pricing = lazy(() => import("pricing/Pricing/Pricing.jsx"));
const Login = lazy(() => import("login/Login/Login.jsx"));
const AppLayout = lazy(() => import("app/AppLayout/AppLayout.jsx"));
const PageNotFound = lazy(() => import("utilities/PageNotFound.jsx"));

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Home />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
