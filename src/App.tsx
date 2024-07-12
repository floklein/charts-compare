import { Plot } from "./components/Plot.tsx";
import { AppBar, Container, Paper, Toolbar, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

export function App() {
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">Reports</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Toolbar disableGutters>
          <Typography variant="h5">Report</Typography>
        </Toolbar>
        <div>
          <Grid2 container spacing={2}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Grid2 key={i} xs={12} sm={6}>
                <Paper sx={{ p: 1 }}>
                  <Plot />
                </Paper>
              </Grid2>
            ))}
          </Grid2>
        </div>
      </Container>
    </>
  );
}
