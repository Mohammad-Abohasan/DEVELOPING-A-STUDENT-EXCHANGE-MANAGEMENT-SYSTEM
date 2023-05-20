import AArUDash1 from '../../images/AArUDash1.jpg';
import AArUDash2 from '../../images/AArUDash2.jpg';

const Dashboard = () => {
  return (
    <>
      <h2 className="title-table pt-4 pb-2 px-3">DashBoard</h2>
      <div id="carouselExampleIndicators" className="px-3 carousel slide">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={AArUDash1}
              className="d-block w-100" style={{ height: '580px' }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src={AArUDash2}
              className="d-block w-100" style={{ height: '580px' }} alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">
            Previous
          </span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">
            Next
          </span>
        </button>
      </div>
    </>
  )
}

export default Dashboard;