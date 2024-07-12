import { useEffect, useRef } from "react";
import { lineY, plot } from "@observablehq/plot";

const DATA_LENGTH = 10000;

function createData() {
  const data: { date: Date; value: number }[] = [];
  for (let i = 0; i < DATA_LENGTH; i++) {
    data.push({
      date: new Date(2021, 0, i),
      value:
        (data[i - 1]?.value ?? Math.random() * Math.sqrt(DATA_LENGTH) * 2) +
        Math.random() * (Math.random() > 0.5 ? 1 : -1),
    });
  }
  return data;
}

function createLine(color: string) {
  return lineY(createData(), {
    x: "date",
    y: "value",
    z: 0,
    stroke: color,
    strokeWidth: 1,
  });
}

export function Plot() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const newPlot = plot({
      y: { grid: true },
      marks: [
        createLine("red"),
        createLine("blue"),
        createLine("green"),
        createLine("yellow"),
        createLine("purple"),
        createLine("orange"),
      ],
    });
    containerRef.current.append(newPlot);
    return () => {
      newPlot.remove();
    };
  }, []);

  return <div ref={containerRef} />;
}
