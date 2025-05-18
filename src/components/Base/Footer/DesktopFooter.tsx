import { IconButton, Box, Typography, Button, useTheme } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const FixedFooter = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  width: '100%',
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1, 3),
  boxShadow: theme.shadows[3],
}));

export default function DesktopFooter() {
  const theme = useTheme();
  return (
    <FixedFooter>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/contact"
        sx={{
          color: theme.palette.text.disabled,
          backgroundColor: theme.palette.action.hover,
        }}
      >
        Contact Support
      </Button>
      <Typography variant="body2" color="action.disabled">
        Copyright © 2024 FitSync. All rights reserved.
      </Typography>
      <Box>
        <IconButton
          color="primary"
          aria-label="facebook"
          href="https://www.facebook.com"
          target="_blank"
        >
          <Facebook />
        </IconButton>
        <IconButton
          color="primary"
          aria-label="twitter"
          href="https://www.twitter.com"
          target="_blank"
        >
          <Twitter />
        </IconButton>
        <IconButton
          color="primary"
          aria-label="instagram"
          href="https://www.instagram.com"
          target="_blank"
        >
          <Instagram />
        </IconButton>
      </Box>
    </FixedFooter>
  );
}
