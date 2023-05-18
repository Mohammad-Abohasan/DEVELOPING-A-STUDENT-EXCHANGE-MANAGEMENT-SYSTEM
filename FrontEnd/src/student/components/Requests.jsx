import {
  DataGrid,
  GridPagination,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
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
import axios from "../../api/axios";
import { useContext, useEffect, useState } from "react";
import { AccessTokenContext } from "../../context/AccessTokenProvider";

const columns = [
  {
    field: "id",
    headerName: "Request ID",
    width: 50,
    flex: 0.4
  },
  {
    field: "university_name",
    headerName: "University Name",
    width: 200,
    flex: 0.4
  },
  {
    field: "request_date",
    headerName: "Request date",
    width: 115,
    valueFormatter: (params) => format(new Date(params.value), "dd/MM/yyyy"),
    flex: 0.4
  },
  {
    field: "request_status",
    headerName: "Request status",
    width: 200,
    flex: 0.4
  },
  {
    field: "cancel_request",
    headerName: "Cancel request",
    renderCell: () => <button className="btn btn-bg" style={{ backgroundColor: "#764abc", color: "white", width: "100%" }}>Cancel request</button>,
    sortable: false,
    flex: 0.5,
  },
  {
    field: "offer_details",
    headerName: "Offer details",
    renderCell: (params) => (
      <Link to={`/offers/${params.id}`} className="btn btn-dark btn-bg" style={{ width: "100%" }}>
        Offer details
      </Link>
    ),
    sortable: false,
    flex: 0.5
  }
];

const rows = [
  {
    id: 1,
    university_name: "Palestine Ahliya University",
    request_date: '2023-06-07',
    request_status: 'Approved'
  },
  {
    id: 2,
    university_name: "Al-Quds University",
    request_date: '2023-07-18',
    request_status: 'Pending'
  },
  {
    id: 3,
    university_name: "Istanbul University",
    offer_date: "2023-05-20",
    request_date: '2023-09-20',
    request_status: 'Denied'
  },
  {
    id: 4,
    university_name: "Sabanci University",
    request_date: '2023-06-11',
    request_status: 'Denied'
  },
  {
    id: 5,
    university_name: "Bogazici University",
    request_date: '2023-10-08',
    request_status: 'Pending'
  },
  {
    id: 6,
    university_name: "Jordan University of Science and Technology",
    request_date: '2023-05-28', request_status: 'Approved'
  },
  {
    id: 7,
    university_name: "Yarmouk University",
    request_date: '2023-03-10',
    request_status: 'Pending'
  },
  {
    id: 8,
    university_name: "University of Jordan",
    request_date: '2023-10-13',
    request_status: 'Denied'
  },
  {
    id: 9,
    university_name: "Cairo University",
    request_date: '2023-04-30',
    request_status: 'Denied'
  },
  {
    id: 10,
    university_name: "American University in Cairo",
    request_date: '2023-07-23',
    request_status: 'Approved'
  },
  {
    id: 11,
    university_name: "Alexandria University",
    request_date: '2023-08-05',
    request_status: 'Pending'
  },
  {
    id: 12,
    university_name: "Al-Mustansiriyah University",
    request_date: '2023-09-05',
    request_status: 'Denied'
  },
  {
    id: 13,
    university_name: "University of Baghdad",
    request_date: '2023-06-18',
    request_status: 'Pending'
  },
  {
    id: 14,
    university_name: "University of Basrah",
    request_date: '2023-05-25',
    request_status: 'Approved'
  },
  {
    id: 15,
    university_name: "An-Najah National University",
    request_date: '2023-07-12',
    request_status: 'Denied'
  },
];

const theme = createTheme({
  palette: {
    primary: {
      main: '#146eb4',
    },
  },
});

const Requests = () => {
  const [requestsData, setRequestsData] = useState([]);
  const { accessToken } = useContext(AccessTokenContext);

  useEffect(() => {
    const getAvailableOffers = async () => {
      try {
        const response = await axios.get('/student/requests', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        console.log(response.data);
        const mappedData = response.data.map((request) => ({
          id: request.id,
          university_name: 'lablabla', // later
          request_date: request.request_date,
          request_status: request.status
        }));
        setRequestsData(mappedData);
      } catch (err) {
        console.error(err);
      }
    }

    getAvailableOffers();

    return () => {
    }
  }, []);

  const handleCellClick = (params, event) => {
    if (params.field === "cancel_request") {
      Swal.fire({
        title: `Confirm canceling the request for ${params.row.university_name} offer?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Cancel Request!',
        cancelButtonText: 'No, Keep Request',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Request canceled successfully!',
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
        <GridToolbarColumnsButton style={{ color: '#146EB4' }} />
        <GridToolbarFilterButton style={{ color: '#146EB4' }} />
        <GridToolbarDensitySelector style={{ color: '#146EB4' }} />
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
      <h2 className="pt-4 pb-2 px-3" sx={{ fontSize: '40px' }}>Follow-up Requests</h2>
      <div className="px-3" style={{ height: 400, width: "100%" }}>
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
              backgroundColor: '#ecf1f1',
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
          rows={requestsData}
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

export default Requests;
