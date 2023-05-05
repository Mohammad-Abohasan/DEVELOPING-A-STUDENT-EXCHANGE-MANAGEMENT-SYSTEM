import { DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns";
import OfferDetails from "./OfferDetails";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "university_name", headerName: "University Name", width: 200 },
  {
    field: "offer_date",
    headerName: "Offer Deadline",
    width: 115,
    valueFormatter: (params) => format(new Date(params.value), "dd/MM/yyyy"),
  },
  { field: "train_type", headerName: "Type", width: 100 },
  { field: "country_name", headerName: "Country", width: 100 },
  { field: "train_start_date", headerName: "ٍStart date", valueFormatter: (params) => format(new Date(params.value), "dd/MM/yyyy"), width: 115 },
  { field: "train_end_date", headerName: "ٍEnd date", valueFormatter: (params) => format(new Date(params.value), "dd/MM/yyyy"), width: 115 },
  { field: "branch_name", headerName: "Branch", width: 100 },
  { field: "other_requirements", headerName: "Other requirements", width: 210 },
  {
    field: "apply",
    headerName: "Apply",
    renderCell: () => <button className="btn btn-success">Apply</button>,
    sortable: false,
    width: 80,
  },
  {
    field: "details",
    headerName: "Details",
    renderCell: (params) => (
      <Link to={`/offers/${params.id}`} className="btn btn-info btn-sm">
        Details
      </Link>
    ),
    sortable: false,
  },
];

const rows = [
  {
    id: 1,
    university_name: "Palestine Ahliya University",
    offer_date: "2023-01-27",
    train_type: "Academic",
    country_name: "Palestine",
    train_start_date: "2023-02-28",
    train_end_date: "2023-06-28",
    branch_name: "Front-End",
    other_requirements: "GPA > 3.5, Jordanian passport"
  },
  {
    id: 2,
    university_name: "Al-Quds University",
    offer_date: "2023-08-15",
    train_type: "Internship",
    country_name: "Palestine",
    train_start_date: "2023-04-15",
    train_end_date: "2023-08-15",
    branch_name: "Back-End",
    other_requirements: "-"
  },
  {
    id: 3,
    university_name: "Istanbul University",
    offer_date: "2023-05-20",
    train_type: "Academic",
    country_name: "Turkey",
    train_start_date: "2023-06-01",
    train_end_date: "2023-10-01",
    branch_name: "Full-Stack",
    other_requirements: "GPA > 3.0, Canadian citizenship"
  },
  {
    id: 4,
    university_name: "Sabanci University",
    offer_date: "2023-06-01",
    train_type: "Internship",
    country_name: "Turkey",
    train_start_date: "2023-09-05",
    train_end_date: "2023-12-30",
    branch_name: "Back-End",
    other_requirements: "GPA > 3.7, US citizenship"
  },
  {
    id: 5,
    university_name: "Bogazici University",
    offer_date: "2023-07-10",
    train_type: "Academic",
    country_name: "Turkey",
    train_start_date: "2023-07-18",
    train_end_date: "2023-11-18",
    branch_name: "Front-End",
    other_requirements: "-"
  },
  {
    id: 6,
    university_name: "Jordan University of Science and Technology",
    offer_date: "2023-04-15",
    train_type: "Internship",
    country_name: "Jordan",
    train_start_date: "2023-09-05",
    train_end_date: "2023-12-30",
    branch_name: "Back-End",
    other_requirements: "GPA > 3.7, US citizenship"
  },
  {
    id: 7,
    university_name: "Yarmouk University",
    offer_date: "2023-09-01",
    train_type: "Academic",
    country_name: "Jordan",
    train_start_date: "2023-12-09",
    train_end_date: "2024-04-09",
    branch_name: "Front-End",
    other_requirements: "GPA > 3.2, UK passport"
  },
  {
    id: 8,
    university_name: "University of Jordan",
    offer_date: "2023-10-25",
    train_type: "Internship",
    country_name: "Jordan",
    train_start_date: "2023-10-22",
    train_end_date: "2024-02-22",
    branch_name: "Full-Stack",
    other_requirements: "-"
  },
  {
    id: 9,
    university_name: "Cairo University",
    offer_date: "2023-03-30",
    train_type: "Academic",
    country_name: "Egypt",
    train_start_date: "2024-01-26",
    train_end_date: "2024-05-26",
    branch_name: "Back-End",
    other_requirements: "-"
  },
  {
    id: 10,
    university_name: "American University in Cairo",
    offer_date: "2023-08-01",
    train_type: "Internship",
    country_name: "Egypt",
    train_start_date: "2024-03-14",
    train_end_date: "2024-07-14",
    branch_name: "Full-Stack",
    other_requirements: "GPA > 3.6, Australian citizenship"
  },
  {
    id: 11,
    university_name: "Alexandria University",
    offer_date: "2023-11-20",
    train_type: "Academic",
    country_name: "Egypt",
    train_start_date: "2024-05-01",
    train_end_date: "2024-09-01",
    branch_name: "Front-End",
    other_requirements: "-"
  },
  {
    id: 12,
    university_name: "Al-Mustansiriyah University",
    offer_date: "2023-05-10",
    train_type: "Internship",
    country_name: "Iraq",
    train_start_date: "2024-05-01",
    train_end_date: "2024-09-01",
    branch_name: "Front-End",
    other_requirements: "-"
  },
  {
    id: 13,
    university_name: "University of Baghdad",
    offer_date: "2023-06-25",
    train_type: "Academic",
    country_name: "Iraq",
    train_start_date: "2024-05-01",
    train_end_date: "2024-09-01",
    branch_name: "Front-End",
    other_requirements: "-"
  },
  {
    id: 14,
    university_name: "University of Basrah",
    offer_date: "2023-09-15",
    train_type: "Internship",
    country_name: "Iraq",
    train_start_date: "2024-05-01",
    train_end_date: "2024-09-01",
    branch_name: "Front-End",
    other_requirements: "-"
  },
  {
    id: 15,
    university_name: "An-Najah National University",
    offer_date: "2023-02-15",
    train_type: "Academic",
    country_name: "Palestine",
    train_start_date: "2024-05-01",
    train_end_date: "2024-09-01",
    branch_name: "Front-End",
    other_requirements: "-"
  },
];

const Offers = () => {
  const handleCellClick = (params, event) => {
    if (params.field === "apply") {
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Offer applied successfully",
      });
    } else if (params.field === "details") {
      <OfferDetails />;
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid py-3 pt-4">
        <div className="row">
          <div className="col-2 sidebar">
            <Sidebar />
          </div>
          <div className="col-10">
            <h1>Available Offers</h1>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                disableRowSelectionOnClick={true}
                sx={{
                  "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                    outline: "none !important",
                  },
                }}
                autoHeight
                disableColumnMenu={true}
                onCellClick={handleCellClick}
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                pageSizeOptions={[10, 25, 50]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Offers;
