import { Container, Box, Typography, TextField, Button } from '@mui/material';
import DisconnectedHeader from '../Base/Header/DisconnectedHeader';
import DisconnectedFooter from '../Base/Footer/DisconnectedFooter';

export default function ResetPassword() {
  return (
    <>
      <DisconnectedHeader />
      <Container component="main" maxWidth="sm" sx={{ mt: 10 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Reset Password
        </Typography>
        <Typography variant="body1" paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur qui
          quos ut modi accusantium ab. Itaque voluptas harum officia molestias
          consequatur possimus atque quas aliquid.
        </Typography>
        <Box component="form" sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            id="email"
            variant="outlined"
            margin="normal"
            required
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Reset Password
          </Button>
        </Box>
      </Container>
      <DisconnectedFooter />
    </>
  );
}
