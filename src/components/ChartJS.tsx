import { useEffect, useRef } from "react";
import { Chart, ChartDataset, registerables } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import "chartjs-scale-timestack";
import { styled } from "@mui/material";

Chart.register(...registerables, zoomPlugin);

const DATA_LENGTH = 10000;

function createData() {
  const data: { x: number; y: number }[] = [];
  for (let i = 0; i < DATA_LENGTH; i++) {
    data.push({
      x: new Date(2021, 0, i).getTime(),
      y:
        (data[i - 1]?.y ?? Math.random() * Math.sqrt(DATA_LENGTH) * 2) +
        Math.random() * (Math.random() > 0.5 ? 1 : -1),
    });
  }
  return data;
}

function createLine(yAxisID: string): ChartDataset<"line"> {
  return {
    label: "",
    data: createData(),
    pointStyle: false,
    yAxisID,
  };
}

const Container = styled("div")({
  position: "relative",
  height: 250,
});

export function ChartJS() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    console.time("chartjs");
    const datasets = [
      createLine("y1"),
      createLine("y1"),
      createLine("y1"),
      createLine("y2"),
      createLine("y2"),
      createLine("y2"),
    ];
    const chart = new Chart(canvasRef.current, {
      type: "line",
      data: {
        datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        locale: navigator.language,
        scales: {
          x: {
            type: "timestack" as "time",
          },
          y1: {
            type: "linear",
            position: "left",
          },
          y2: {
            type: "linear",
            position: "left",
          },
        },
        interaction: {
          intersect: false,
          mode: "x",
        },
        plugins: {
          zoom: {
            pan: {
              enabled: true,
              mode: "x",
            },
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
              mode: "x",
            },
          },
        },
      },
    });
    console.timeEnd("chartjs");
    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <Container>
      <canvas ref={canvasRef} />
    </Container>
  );
}
