
import LoginPage from "views/LoginPage.jsx";
import FavoritesPage from "views/FavoritesPage.jsx";
import PortfolioPage from "views/PortfolioPage.jsx";
import LandingPage from "views/LandingPage.jsx";
import currency from "views/components/CurrencyTable.jsx";


var indexRoutes = [
  { path: "/login-page", name: "LoginPage", component: LoginPage },
  { path: "/currency-table", name: "currency", component: currency },
  { path: "/favorites-page", name: "FavoritesPage", component: FavoritesPage },
  { path: "/portfolio-page", name: "PortfolioPage", component: PortfolioPage },
  { path: "/", name: "LandingPage", component: LandingPage }
];

export default indexRoutes;
