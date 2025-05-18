import { Box, Typography, IconButton } from '@mui/material';
import { Add as PlusIcon } from '@mui/icons-material';

export default function CtaMore() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      sx={{ p: 2, borderRadius: 2, boxShadow: 3, bgcolor: 'background.paper' }}
    >
      <Typography variant="h5">More</Typography>
      <IconButton color="primary">
        <PlusIcon fontSize="large" />
      </IconButton>
    </Box>
  );
}
