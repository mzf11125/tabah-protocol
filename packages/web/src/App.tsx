import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.js";
import Dashboard from "./pages/Dashboard.js";
import Campaigns from "./pages/Campaigns.js";
import CampaignDetail from "./pages/CampaignDetail.js";
import Partners from "./pages/Partners.js";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/campaigns/:id" element={<CampaignDetail />} />
          <Route path="/partners" element={<Partners />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
