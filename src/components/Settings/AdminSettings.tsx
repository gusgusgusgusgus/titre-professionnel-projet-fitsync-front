import { Typography, Button, Container, Box } from '@mui/material';

import AdminFooter from '../Base/Footer/AdminFooter';
import AdminHeader from '../Base/Header/AdminHeader';

export default function AdminSettings() {
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
          mt: 1,
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 10 }}>
          Admin settings
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            width: '100%',
            maxWidth: 300,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            href="/*"
            sx={{ py: 2, fontSize: '1.2rem' }}
          >
            Add new sport
          </Button>
          <Button
            variant="contained"
            color="primary"
            href="/*"
            sx={{ py: 2, fontSize: '1.2rem' }}
          >
            Modify
          </Button>
          <Button
            variant="contained"
            color="primary"
            href="/*"
            sx={{ py: 2, fontSize: '1.2rem' }}
          >
            Delete
          </Button>
        </Box>
      </Container>
      <AdminFooter />
    </>
  );
}
