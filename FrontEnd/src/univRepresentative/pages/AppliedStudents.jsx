import {
  DataGrid,
  GridPagination,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  gridPageCountSelector,
  useGridApiContext,
  useGridSelector
} from "@mui/x-data-grid";
import { format } from "date-fns";
import { Link, useParams } from "react-router-dom";
import MuiPagination from '@mui/material/Pagination';
import { useContext, useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { AccessTokenContext } from "../../context/AccessTokenProvider";
import axios from '../../api/axios';
import Loading from '../../loading/Loading';

const columns = [
  // "notes": null,
  // "offer_id": 278,
  // "student_id": 201913064,
  // "student": {
  //     "name": "Mohammad Ameen S. A. Abuhasan",
  //     "gpa": 92.9,
  //     "major": "Computer Systems Engineering",
  //     "english_1_mark": 98,
  //     "english_2_mark": 95
  // }
  {
    field: "id",
    headerName: "Request ID",
    width: 50,
    flex: 0.3
  },
  {
    field: "student_id",
    headerName: "Student ID",
    width: 50,
    flex: 0.3
  },
  {
    field: "student_name",
    headerName: "Student Name",
    width: 200,
    flex: 0.7
  },
  {
    field: "offer_id",
    headerName: "Offer ID",
    width: 50,
    flex: 0.3
  },
  {
    field: "request_date",
    headerName: "Request Date",
    width: 115,
    valueFormatter: (params) => format(new Date(params.value), "dd/MM/yyyy"),
    flex: 0.4
  },
  {
    field: "notes",
    headerName: "Notes",
    flex: 0.4
  },
  {
    field: "request_status",
    headerName: "Request Status",
    cellClassName: (params) => {
      const status = params.value?.toLowerCase();
      if (status === "accepted") {
        return "status-accepted";
      } else if (status === "rejected") {
        return "status-rejected";
      } else if (status === "pending") {
        return "status-pending";
      } else if (status === "cancelled") {
        return "status-cancelled";
      }
      return "";
    },
    width: 80,
    flex: 0.4
  },

  // {
  //   field: "apply",
  //   headerName: "View students",
  //   renderCell: (params) =>
  //     <Link to={`${params.id}`}className="btn btn-bg" style={{ backgroundColor: "#764abc", color: "white", width: "100%" }}>
  //       View students
  //     </Link>,
  //   sortable: false,
  //   flex: 0.6
  // },
  // {
  //   field: "details",
  //   headerName: "Details",
  //   renderCell: (params) => (
  //     <Link to={`/universityRepresentative/archivedOffers/${params.id}`} className="btn btn-bg" style={{ width: "100%", backgroundColor: "#146eb4", color: "#FFFFFF" }}>
  //       Details
  //     </Link>
  //   ),
  //   sortable: false,
  //   flex: 0.4
  // }
];

const theme = createTheme({
  palette: {
    primary: {
      main: '#146eb4',
    },
  },
});

const AppliedStudents = () => {
  const { offerID } = useParams();
  const [offersData, setOffersData] = useState([]);
  const { accessToken } = useContext(AccessTokenContext);

  const getAppliedStudents = async () => {
    try {
      const response = await axios.get(`/offer/studentList/${offerID}`,
        {
          offer_id: offerID
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
      console.log(response);
      const mappedData = response.data.data.map((request, index) => ({
        id: request.id,
        student_id: request.student_id,
        student_name: request.student.name,
        offer_id: request.offer_id,
        request_date: request.request_date,
        notes: request.notes,
        request_status: request.status,
      }));
      setOffersData(mappedData);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getAppliedStudents();
  }, []);

  function CustomToolbar() {
    return (
      <GridToolbarContainer style={{ backgroundColor: 'whitesmoke' }}>
        <GridToolbarColumnsButton style={{ color: '#146eb4' }} />
        <GridToolbarFilterButton style={{ color: '#146eb4' }} />
        <GridToolbarDensitySelector style={{ color: '#146eb4' }} />
        <GridToolbarExport style={{ color: '#146eb4' }} />
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
      {offersData.length === 0 ? (
        <Loading />
      ) : (
        <>
          <h2 className="pt-4 pb-2 px-3">Applied Students</h2>
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
              rows={offersData}
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

export default AppliedStudents;
