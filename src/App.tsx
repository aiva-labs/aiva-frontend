import { Switch, Route } from "wouter";
import AppPage from "./pages/app";
import PwaPage from "./pages/pwa";
import NotFound from "./pages/not-found";

export default function App() {
  return (
    <Switch>
      <Route path="/app" component={AppPage} />
      <Route path="/pwa" component={PwaPage} />
      <Route component={NotFound} />
    </Switch>
  );
}
