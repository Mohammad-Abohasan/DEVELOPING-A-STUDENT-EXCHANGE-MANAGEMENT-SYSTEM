import Sidebar from "./Sidebar"
import Navbar from "./Navbar"

const Requests = () => {
  return (
    <>
      <Navbar />
      <div className="container-fluid py-3 pt-4">
        <div className="row">
          <div className="col-2 sidebar">
            <Sidebar />
          </div>
          <div className="col-10">
            <div>Requests</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Requests