import { DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns";
import OfferDetails from "./OfferDetails";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "university_name", headerName: "University Name", width: 200 },
  {
    field: "offer_date",
    headerName: "Offer Deadline",
    width: 130,
    valueFormatter: (params) => format(new Date(params.value), "dd/MM/yyyy"),
  },
  { field: "train_type", headerName: "Offer Type", width: 130 },
  { field: "country_name", headerName: "Country", width: 130 },
  {
    field: "apply",
    headerName: "Apply",
    renderCell: () => <button className="btn btn-success">Apply</button>,
    width: 150,
    sortable: false,
  },
  {
    field: "details",
    headerName: "Details",
    renderCell: (params) => <Link to={`/offers/${params.id}`} className="btn btn-info btn-sm">Details</Link>,
    width: 150,
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
  },
  {
    id: 2,
    university_name: "Al-Quds University",
    offer_date: "2023-08-15",
    train_type: "Internship",
    country_name: "Palestine",
  },
  {
    id: 3,
    university_name: "Istanbul University",
    offer_date: "2023-05-20",
    train_type: "Academic",
    country_name: "Turkey",
  },
  {
    id: 4,
    university_name: "Sabanci University",
    offer_date: "2023-06-01",
    train_type: "Internship",
    country_name: "Turkey",
  },
  {
    id: 5,
    university_name: "Bogazici University",
    offer_date: "2023-07-10",
    train_type: "Academic",
    country_name: "Turkey",
  },
  {
    id: 6,
    university_name: "Jordan University of Science and Technology",
    offer_date: "2023-04-15",
    train_type: "Internship",
    country_name: "Jordan",
  },
  {
    id: 7,
    university_name: "Yarmouk University",
    offer_date: "2023-09-01",
    train_type: "Academic",
    country_name: "Jordan",
  },
  {
    id: 8,
    university_name: "University of Jordan",
    offer_date: "2023-10-25",
    train_type: "Internship",
    country_name: "Jordan",
  },
  {
    id: 9,
    university_name: "Cairo University",
    offer_date: "2023-03-30",
    train_type: "Academic",
    country_name: "Egypt",
  },
  {
    id: 10,
    university_name: "American University in Cairo",
    offer_date: "2023-08-01",
    train_type: "Internship",
    country_name: "Egypt",
  },
  {
    id: 11,
    university_name: "Alexandria University",
    offer_date: "2023-11-20",
    train_type: "Academic",
    country_name: "Egypt",
  },
  {
    id: 12,
    university_name: "Al-Mustansiriyah University",
    offer_date: "2023-05-10",
    train_type: "Internship",
    country_name: "Iraq",
  },
  {
    id: 13,
    university_name: "University of Baghdad",
    offer_date: "2023-06-25",
    train_type: "Academic",
    country_name: "Iraq",
  },
  {
    id: 14,
    university_name: "University of Basrah",
    offer_date: "2023-09-15",
    train_type: "Internship",
    country_name: "Iraq",
  },
  {
    id: 15,
    university_name: "An-Najah National University",
    offer_date: "2023-02-15",
    train_type: "Academic",
    country_name: "Palestine",
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
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          disableColumnMenu={true}
          disableSelectionOnClick={true}
          //   onCellClick={handleCellClick}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 25, 50]}
        />
      </div>
    </>
  );
};

export default Offers;
