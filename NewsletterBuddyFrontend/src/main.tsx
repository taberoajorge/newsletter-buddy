import { render } from "preact";
import App from "./routes/app";

render(<App />, document.getElementById("app") as HTMLElement);
