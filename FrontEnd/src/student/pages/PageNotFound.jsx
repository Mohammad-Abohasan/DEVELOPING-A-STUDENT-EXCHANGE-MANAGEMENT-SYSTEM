import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh'
        }}
      >
        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Grid xs={12} sm={6}>
              <Typography variant="h1">
                404
              </Typography>
              <Typography variant="h6">
                The page you’re looking for doesn’t exist.
              </Typography>
              <Button sx={{ mt: 2 }} variant="contained" color="error" onClick={() => navigate('/universityRepresentative/publishedOffers')}>Back Home</Button>
            </Grid>
            <Grid xs={12} sm={6}>
              <img
                src="https://edugate.ptuk.edu.ps/faces/javax.faces.resource/images/error-face.svg?ln=spark-layout"
                alt=""
                width={500} height={250}
              />
            </Grid>
          </Grid>
        </Container>
      </Box >
    </>
  )
}

export default PageNotFound