import { Router, Route } from "preact-router";
import NewsletterBuddy from "../pages/NewsletterBuddy";
import Unsubscribe from "../pages/Unsubscribe";
import "../global.css";

const App = () => {
  return (
    <div>
      <Router>
        <Route path="/" component={NewsletterBuddy} />
        <Route path="/unsubscribe/:userId" component={Unsubscribe} />
      </Router>
    </div>
  );
};

export default App;
