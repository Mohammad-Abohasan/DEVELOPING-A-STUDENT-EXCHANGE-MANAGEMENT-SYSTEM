import {
  DataGrid,
  GridPagination,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  // GridToolbarExport,
  GridToolbarFilterButton,
  gridPageCountSelector,
  useGridApiContext,
  useGridSelector
} from "@mui/x-data-grid";
import { format } from "date-fns";
import MuiPagination from '@mui/material/Pagination';
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 50,
    flex: 0.3
  },
  {
    field: "university_name",
    headerName: "University Name",
    width: 200,
    flex: 0.7
  },
  {
    field: "offer_date",
    headerName: "Deadline",
    width: 115,
    valueFormatter: (params) => format(new Date(params.value), "dd/MM/yyyy"),
    flex: 0.4
  },
  {
    field: "train_type",
    headerName: "Type",
    flex: 0.4
  },
  {
    field: "country_name",
    headerName: "Country",
    flex: 0.4
  },
  {
    field: "train_start_date",
    headerName: "ٍStart date",
    valueFormatter: (params) => format(new Date(params.value), "dd/MM/yyyy"), 
    width: 115, 
    flex: 0.4
  },
  {
    field: "train_end_date",
    headerName: "End date",
    valueFormatter: (params) => format(new Date(params.value), "dd/MM/yyyy"), 
    width: 115, 
    flex: 0.4
  },
  {
    field: "branch_name",
    headerName: "Branch",
    width: 100,
    flex: 0.4
  },
  {
    field: "other_requirements",
    headerName: "Other requirements",
    flex: 0.7
  },
  {
    field: "apply",
    headerName: "Apply",
    renderCell: () =>
      <button className="btn btn-bg" style={{ backgroundColor: "#764abc", color: "white", width: "100%" }}>
        Apply
      </button>,
    sortable: false,
    flex: 0.4
  },
  {
    field: "details",
    headerName: "Details",
    renderCell: (params) => (
      <Link to={`${params.id}`} className="btn btn-dark btn-bg" style={{ width: "100%" }}>
        Details
      </Link>
    ),
    sortable: false,
    flex: 0.4
  }
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

const theme = createTheme({
  palette: {
    primary: {
      main: '#146eb4',
    },
  },
});

const Offers = () => {

  const handleCellClick = (params, event) => {
    if (params.field === "apply") {
      Swal.fire({
        title: `Confirm applying for ${params.row.university_name} offer?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Apply!',
        cancelButtonText: 'Cancel',
        // toast: true,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Offer applied successfully!',
            icon: 'success',
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000
          });
        }
      });
    }
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer style={{ backgroundColor: 'whitesmoke' }}>
        <GridToolbarColumnsButton style={{ color: '#146eb4' }} />
        <GridToolbarFilterButton style={{ color: '#146eb4' }} />
        <GridToolbarDensitySelector style={{ color: '#146eb4' }} />
      </GridToolbarContainer>
    );
  }

  function Pagination({ page, onPageChange, className }) {
    const apiRef = useGridApiContext();
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
      <ThemeProvider theme={theme}>
        <MuiPagination
          color="primary"
          className={className}
          count={pageCount}
          page={page + 1}
          onChange={(event, newPage) => {
            onPageChange(event, newPage - 1);
          }}
        />
      </ThemeProvider>
    )
  }

  function CustomPagination(props) {
    return <GridPagination ActionsComponent={Pagination} {...props} />;
  }

  return (
    <>
      <h2 className="title-table pt-4 pb-2 px-3">Available Offers</h2>
      <div className="px-3" >
        <DataGrid
          disableRowSelectionOnClick={true}
          sx={{
            boxShadow: 10,
            border: 1,
            borderColor: '#cacaca',
            '& .MuiDataGrid-toolbarContainer': {
              backgroundColor: '#fff',
              display: 'flex',
              alignItems: 'center',
              '& > *': {
                marginLeft: theme.spacing(2),
              },
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 'bold',
              fontSize: '16px',
            },
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: '#ECF1F1',
              color: '#7A7E8D',
              '&:hover': {
                backgroundColor: '#E1E1E1',
              }
            },
            '& .MuiDataGrid-columnHeader:focus-within, .MuiDataGrid-cell:focus-within': {
              outline: "none !important",
            },
            '& p': {
              marginBottom: "0"
            }
          }}

          autoHeight
          disableColumnMenu={true}
          onCellClick={handleCellClick}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 15, 20, 25]}
          slots={{
            toolbar: CustomToolbar,
            pagination: CustomPagination
          }}
        />
      </div>
    </>
  );
};

export default Offers;
