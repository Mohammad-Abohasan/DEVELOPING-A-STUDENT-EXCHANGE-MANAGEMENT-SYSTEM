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
import Swal from "sweetalert2";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import MuiPagination from '@mui/material/Pagination';
import { useContext, useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { AccessTokenContext } from "../../context/AccessTokenProvider";
import axios from '../../api/axios';
import Loading from '../components/Loading';

const columns = [
  {
    field: "id",
    headerName: "Offer ID",
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
    headerName: "Start date",
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
      <Link to={`${params.id}/apply`} className="btn btn-bg" style={{ width: "100%", backgroundColor: "#146eb4", color: "#FFFFFF" }}>
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

const Offers = () => {
  const [offersData, setOffersData] = useState([]);
  const { accessToken } = useContext(AccessTokenContext);

  const getAvailableOffers = async () => {
    try {
      const response = await axios.get('/student/availableOffers', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      const mappedData = response.data.map((offer, index) => ({
        id: offer.id,
        university_name: offer.university_src.name,
        country_name: offer.university_src.country,
        city: offer.university_src.city,
        branch_name: offer.branch_name,
        college_name: offer.college_name,
        offer_date: offer.offer_date,
        train_type: offer.train_type,
        train_start_date: offer.train_start_date,
        train_end_date: offer.train_end_date,
        other_requirements: offer.other_requirements,
      }));
      setOffersData(mappedData);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getAvailableOffers();
  }, []);

  const handleCellClick = (params, event) => {
    if (params.field === "apply") {
      handleApply(params.row);
    }
  };

  const handleApply = async (params) => {
    const { value: confirmed } = await Swal.fire({
      title: `Confirm applying for ${params.university_name} offer?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Apply!',
      cancelButtonText: 'Cancel',
      allowOutsideClick: false
    });

    if (confirmed) {
      try {
        const response = await submitOffer(params);
        const swalOptions = {
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 3000
        };
        if (response === 'Request submitted successfully 🥳') {
          Swal.fire({
            ...swalOptions,
            title: 'Offer applied successfully!',
            icon: 'success'
          });
        } else {
          Swal.fire({
            ...swalOptions,
            title: 'Failed to apply for the offer',
            text: response,
            icon: 'error'
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const submitOffer = async (params) => {
    try {
      const response = await axios.post(`/student/submitOffer`, {
        offer_id: params.id
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      return response.data.message;
    } catch (err) {
      console.error(err);
    }
  }

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
      {offersData.length === 0 ? (
        <Loading />
      ) : (
        <>
          <h2 className="pt-4 pb-2 px-3">Available Offers</h2>
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
              onCellClick={handleCellClick}
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

export default Offers;
