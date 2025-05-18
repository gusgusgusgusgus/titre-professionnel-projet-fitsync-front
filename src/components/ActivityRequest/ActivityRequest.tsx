import React from 'react';
import { Typography, Container, Paper, Grid } from '@mui/material';
import AdminFooter from '../Base/Footer/AdminFooter';
import AdminHeader from '../Base/Header/AdminHeader';

export default function ActivityRequest() {
  return (
    <>
      <AdminHeader />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          mt: 5,
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Activity requests
        </Typography>
        <Grid container spacing={4} sx={{ maxWidth: 800 }}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                padding: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                Activity Requests 01
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                padding: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                Activity Requests 02
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                padding: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                Activity Requests 03
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                padding: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                Activity Requests 04
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <AdminFooter />
    </>
  );
}
