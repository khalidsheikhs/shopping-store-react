import './App.css'; // For global styles
import Header from "./components/Header";
import Footer from "./components/Footer";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"; // For react router
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <div className="grid-container">
        <Router>
            <Header />
            <main className="bg-gray-100">
                <div className="container-none mx-auto">
                    <Switch>
                        <Route path="/" exact component={Products} />
                        <Route path="/product/:productId" component={ProductDetails} />
                        <Route>404 Not Found!</Route>
                    </Switch>
                </div>
            </main>
            <Footer />
        </Router>
    </div>
  );
}

export default App;
