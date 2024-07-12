import {
  AppBar,
  Button,
  ButtonGroup,
  Container,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { ChartJS } from "./components/ChartJS.tsx";
import { useCallback, useState } from "react";
import { Plot } from "./components/Plot.tsx";

export function App() {
  const [library, setLibrary] = useState<"plot" | "chartjs">("plot");
  const [widgets, setWidgets] = useState<number[]>([]);

  const changeLibrary = useCallback(
    (newLibrary: "plot" | "chartjs") => () => {
      setLibrary(newLibrary);
    },
    [],
  );

  const addWidget = useCallback(() => {
    setWidgets((widgets) => [...widgets, widgets.length]);
  }, []);

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">Reports</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <ButtonGroup>
            <Button
              variant={library === "plot" ? "contained" : undefined}
              onClick={changeLibrary("plot")}
            >
              Plot
            </Button>
            <Button
              variant={library === "chartjs" ? "contained" : undefined}
              onClick={changeLibrary("chartjs")}
            >
              ChartJS
            </Button>
          </ButtonGroup>
          <Button variant="contained" onClick={addWidget}>
            Add widget
          </Button>
        </Toolbar>
        <div>
          <Grid2 container spacing={2}>
            {widgets.map((i) => (
              <Grid2 key={i} xs={12} sm={6}>
                <Paper sx={{ p: 1 }}>
                  {library === "plot" && <Plot />}
                  {library === "chartjs" && <ChartJS />}
                </Paper>
              </Grid2>
            ))}
          </Grid2>
        </div>
      </Container>
    </>
  );
}
