import { useEffect, useRef } from "react";
import { Chart, ChartDataset, registerables } from "chart.js";
import "chartjs-scale-timestack";
import zoomPlugin from "chartjs-plugin-zoom";

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

function createLine(): ChartDataset<"line"> {
  return {
    label: "",
    data: createData(),
    pointStyle: false,
  };
}

export function ChartJS() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    console.time("chartjs");
    const datasets = [
      createLine(),
      createLine(),
      createLine(),
      createLine(),
      createLine(),
    ];
    const chart = new Chart(canvasRef.current, {
      type: "line",
      data: {
        datasets,
      },
      options: {
        scales: {
          x: {
            type: "timestack",
          },
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

  return <canvas ref={canvasRef} />;
}
