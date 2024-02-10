import { Router, Route } from "preact-router";
import NewsletterBuddy from "../pages/NewsletterBuddy";
import Unsubscribe from "../pages/Unsubscribe";
import { GlobalStyles } from "../global-styles";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <main>
      <GlobalStyles />
      <Router>
        <Route path="/" component={NewsletterBuddy} />
        <Route path="/unsubscribe/:userId" component={Unsubscribe} />
      </Router>
      <ToastContainer />
    </main>
  );
};

export default App;
