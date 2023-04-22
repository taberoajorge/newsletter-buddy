import { Router, Route } from "preact-router";
import NewsletterBuddy from "../pages/NewsletterBuddy";
import Unsubscribe from "../pages/Unsubscribe";
import { GlobalStyles } from "../GlobalStyles";

const App = () => {
  return (
    <main>
      <GlobalStyles />
      <Router>
        <Route path="/" component={NewsletterBuddy} />
        <Route path="/unsubscribe/:userId" component={Unsubscribe} />
      </Router>
    </main>
  );
};

export default App;
