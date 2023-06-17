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
import Swal from "sweetalert2";
import { format } from "date-fns";
import { Link, useParams } from "react-router-dom";
import MuiPagination from '@mui/material/Pagination';
import { useContext, useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { AccessTokenContext } from "../../context/AccessTokenProvider";
import axios from "../../api/axios";
import Loading from "../../loading/Loading";

const columns = [
  {
    field: "id",
    headerName: "Request ID",
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
    field: "country_name",
    headerName: "Country",
    flex: 0.4
  },
  {
    field: "request_status",
    headerName: "Request Status",
    renderCell: (params) => (
      <p className={`status-${params.value?.toLowerCase()}`} >
        {params.value}
      </p>
    ),
    width: 80,
    flex: 0.4
  },
  {
    field: "train_start_date",
    headerName: "Offer Start date",
    valueFormatter: (params) => format(new Date(params.value), "dd/MM/yyyy"),
    width: 115,
    flex: 0.4
  },
  {
    field: "train_end_date",
    headerName: "Offer End date",
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
    field: "request_date",
    headerName: "Request date",
    width: 115,
    valueFormatter: (params) => format(new Date(params.value), "dd/MM/yyyy"),
    flex: 0.4
  },
  {
    field: "details",
    headerName: "Details",
    renderCell: (params) => (
      <Link to={`../offers/${params.row.offer_id}/noApply`} className="btn btn-bg" style={{ width: "100%", backgroundColor: "#146eb4", color: "#FFFFFF" }}>
        Details
      </Link>
    ),
    sortable: false,
    flex: 0.4
  }
];

const theme = createTheme({
  palette: {
    primary: {
      main: '#146eb4',
    },
  },
});

const StudentArchive = () => {
  const { studentID } = useParams();
  const [requestsData, setRequestsData] = useState([]);
  const { accessToken } = useContext(AccessTokenContext);

  const getRequests = async () => {
    try {
      const response = await axios.get(`/offer/studentArchive/${studentID}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
      console.log(response.data);
      const mappedData = response.data.map((request, index) => ({
        id: index + 1,
        offer_id: request.offer_id,
        university_name: request.offer.university_src.name,
        offer_date: request.offer.offer_date,
        country_name: request.offer.university_src.country,
        request_status: request.status,
        train_start_date: request.offer.train_start_date,
        train_end_date: request.offer.train_end_date,
        branch_name: request.offer.branch_name,
        request_date: request.request_date
      }));
      setRequestsData(mappedData);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getRequests();
  }, []);

  const handleCellClick = (params, event) => {
    if (params.field === "cancel_request" && params.row.request_status?.toLowerCase() !== 'cancelled') {
      handleCancelRequest(params.row);
    }
  };

  const handleCancelRequest = async (params) => {
    const { value: confirmed } = await Swal.fire({
      title: `Confirm canceling the request for ${params.university_name} offer?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Cancel Request!',
      cancelButtonText: 'No, Keep Request',
    });

    if (confirmed) {
      try {
        const response = await cancelOffer(params);
        const swalOptions = {
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 3000
        };
        if (response === 'Request cancelled successfully 🙂') {
          getRequests();
          Swal.fire({
            ...swalOptions,
            title: 'Request canceled successfully!',
            icon: 'success',
          });
        } else {
          Swal.fire({
            ...swalOptions,
            title: 'Request cancellation failed!',
            text: response,
            icon: 'error'
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const cancelOffer = async (params) => {
    try {
      const response = await axios.patch(`/student/cancelRequest`, {
        request_id: params.id
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      // console.log(response.data.message);
      return response.data.message;
    } catch (err) {
      console.error(err);
    }
  }

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
      {requestsData.length === 0 ? (
        <Loading />
      ) : (
        <>
          <h2 className="pt-4 pb-2 px-3" sx={{ fontSize: '40px' }}>Student Archive</h2>
          <div className="px-3 pb-5">
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
      )}
    </>
  );
};

export default StudentArchive;
