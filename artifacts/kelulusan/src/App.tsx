import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "@/pages/Home";
import { HasilPage } from "@/pages/HasilPage";
import { AdminPage } from "@/pages/AdminPage";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/hasil/:nisn">
        {(params) => <HasilPage nisn={params.nisn} />}
      </Route>
      <Route path="/admin" component={AdminPage} />
      <Route component={Home} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
