import { Box, Typography, IconButton } from '@mui/material';
import { Add as PlusIcon } from '@mui/icons-material';

export default function CtaAdd() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        p: 2,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
      }}
    >
      <Typography variant="h5">Add Activity</Typography>
      <IconButton color="inherit">
        <PlusIcon fontSize="large" />
      </IconButton>
    </Box>
  );
}
