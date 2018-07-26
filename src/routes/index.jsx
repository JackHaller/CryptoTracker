
import LoginPage from "views/LoginPage/LoginPage.jsx";
import FavoritesPage from "views/FavoritesPage/FavoritesPage.jsx";
import PortfolioPage from "views/PortfolioPage/PortfolioPage.jsx";
import LandingPage from "views/LandingPage/LandingPage.jsx";
import currency from "views/LandingPage/Sections/CurrencyTable.jsx";

var indexRoutes = [
  { path: "/login-page", name: "LoginPage", component: LoginPage },
  { path: "/currency-table", name: "currency", component: currency },
  { path: "/favorites-page", name: "FavoritesPage", component: FavoritesPage },
  { path: "/portfolio-page", name: "PortfolioPage", component: PortfolioPage },
  { path: "/", name: "LandingPage", component: LandingPage }
];

export default indexRoutes;
