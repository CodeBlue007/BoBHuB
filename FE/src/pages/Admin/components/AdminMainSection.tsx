import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Users from './User/components/Users';
import Foods from './Restraunt/Foods';
import Box from '@mui/material/Box';

interface AdminMainSectionProps {
  selectedButton: string;
}

const AdminMainSection = ({ selectedButton }: AdminMainSectionProps) => {
  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}>
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              {selectedButton === 'users' && <Users />}
              {selectedButton === 'restaurants' && <Foods />}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminMainSection;