import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ChartDisplay({ data, xKey, yKey }) {
  const chartData = {
    labels: data.map((row) => row[xKey]),
    datasets: [
      {
        label: `${yKey} vs ${xKey}`,
        data: data.map((row) => row[yKey]),
        backgroundColor: "rgba(59,130,246,0.6)",
      },
    ],
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <Bar data={chartData} />
    </div>
  );
}
