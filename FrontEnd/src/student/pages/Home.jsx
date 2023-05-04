import Sidebar from "../components/Sidebar";
import Offers from "../components/Offers";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import OfferDetails from "../components/OfferDetails";
import Navbar from "../components/Navbar";
import Requests from "../components/Requests";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className={`container-fluid py-3 pt-4`}>
        <div className="row">
          <div className="col-3 sidebar">
            <Sidebar />
          </div>
          <div className="col-9">
            <Routes>
              <Route path="/offers" element={<Outlet />}>
                <Route path="" element={<Offers />} />
                <Route path=":offerID" element={<OfferDetails />} />
              </Route>
              <Route path="/requests" element={<Outlet />}>
                <Route path="" element={<Requests />} />
                {/* <Route path=":requestID" element={<RequestDetails />} /> */}
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
