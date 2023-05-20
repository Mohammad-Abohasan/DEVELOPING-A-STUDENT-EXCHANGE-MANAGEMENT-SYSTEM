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
            <img src="http://www.aaru.edu.jo/TEMP_AARU_test/assets/images/a.sumaia2.jpg"
              className="d-block w-100" style={{ height: '580px' }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="http://www.aaru.edu.jo/TEMP_AARU_test/assets/images/shutterstock_123603871-546x291.jpg"
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