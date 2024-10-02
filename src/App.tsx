import { Layout } from "./components/Reading/Layout";
import { Layout as Practice_Layout } from "./components/Practice/Layout";
import { Layout as ProgrLayout } from "./components/Progression/Layout";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Home as ProgrHome } from "./pages/Progression/Home";
import { Page } from "./pages/Progression/Page";
import { MonthlyReport } from "./pages/MonthlyReport";
import { Practice } from "./pages/Practice";

const App: React.FC = () => {
 return (
  <BrowserRouter>
   <Routes>
    <Route
     path="/"
     element={
      <Layout>
       <Home />
      </Layout>
     }
    ></Route>
    <Route
     path="/monthly-report"
     element={
      <Layout>
       <MonthlyReport />
      </Layout>
     }
    ></Route>
    <Route
     path="/practice"
     element={
      <Practice_Layout>
       <Practice />
      </Practice_Layout>
     }
    ></Route>

    <Route
     path="/progression"
     element={
      <ProgrLayout>
       <ProgrHome />
      </ProgrLayout>
     }
    ></Route>
    <Route
     path="/progression/:subject"
     element={
      <ProgrLayout>
       <Page />
      </ProgrLayout>
     }
    ></Route>

    <Route
     path="*"
     element={
      <>
       <h1>404 Not Found</h1>
      </>
     }
    />
   </Routes>
  </BrowserRouter>
 );
};

export default App;
