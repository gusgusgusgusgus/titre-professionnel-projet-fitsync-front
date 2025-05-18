import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './Footer.scss';

export default function DisconnectedFooter() {
  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 2,
        bgcolor: 'background.paper',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Typography variant="body1" color="text.secondary">
        © Fitsync 2024
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        component={Link}
        to="/contact"
        sx={{
          textDecoration: 'none',
          '&:hover': {
            color: 'primary.main',
          },
        }}
      >
        Contact support
      </Typography>
    </Box>
  );
}
