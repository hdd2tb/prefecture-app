import type { ChartData, ChartOptions } from "chart.js"
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js"
import React from "react"
import { Line } from "react-chartjs-2"

interface LineProps {
  options: ChartOptions<"line">
  data: ChartData<"line">
}

interface PrefPop {
  year: number
  value: number
}

interface Props {
  data?: PrefPop[][]
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const PopulationChart: React.FC<Props> = ({ data }) => {
  const data2: PrefPop[][] = [
    [
      { year: 1960, value: 2430871 },
      { year: 1965, value: 3014983 },
      { year: 1970, value: 3866472 },
      { year: 1975, value: 4821340 },
      { year: 1980, value: 5420480 },
      { year: 1985, value: 5863678 },
      { year: 1990, value: 6405319 },
      { year: 1995, value: 6759311 },
      { year: 2000, value: 6938006 },
      { year: 2005, value: 7054243 },
      { year: 2010, value: 7194556 },
      { year: 2015, value: 7266534 },
      { year: 2020, value: 7272830 },
      { year: 2025, value: 7202953 },
      { year: 2030, value: 7076167 },
      { year: 2035, value: 6909319 },
      { year: 2040, value: 6721414 },
      { year: 2045, value: 6524800 },
    ],
    [
      { year: 1960, value: 2306010 },
      { year: 1965, value: 2701770 },
      { year: 1970, value: 3366624 },
      { year: 1975, value: 4149147 },
      { year: 1980, value: 4735424 },
      { year: 1985, value: 5148163 },
      { year: 1990, value: 5555429 },
      { year: 1995, value: 5797782 },
      { year: 2000, value: 5926285 },
      { year: 2005, value: 6056462 },
      { year: 2010, value: 6216289 },
      { year: 2015, value: 6222666 },
      { year: 2020, value: 6204651 },
      { year: 2025, value: 6118170 },
      { year: 2030, value: 5985915 },
      { year: 2035, value: 5822882 },
      { year: 2040, value: 5645611 },
      { year: 2045, value: 5463363 },
    ],
  ]

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "都道府県人口推移",
      },
    },
  }

  const selectColor = (prefNum: number) => {
    const colors = ["red", "blue", "green", "black", "purple", "orange", "gray"]

    return colors[prefNum % colors.length]
  }
  console.log(data)

  const data4 = {
    labels: data[0].map((prefPop: PrefPop) => prefPop.year),
    datasets: data.map((prefPops: PrefPop[]) => {
      return {
        label: selectColor(11),
        borderColor: selectColor(11),
        data: prefPops.map((prefPop: PrefPop) => prefPop.value),
      }
    }),
  }

  return <Line data={data4} options={options} />
}

export default PopulationChart
