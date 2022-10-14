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
import { useRecoilValue } from "recoil"
import { checkedPrefsState } from "../atoms/CheckedPrefsAtom"
import { prefPopsState } from "../atoms/PrefPopsAtom"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const selectColor = (prefNum: number) => {
  const colors = ["red", "blue", "green", "black", "purple", "orange", "gray"]

  return colors[prefNum % colors.length]
}

const PopulationChart: React.FC = () => {
  const checkedPrefs = useRecoilValue(checkedPrefsState)
  const prefPops = useRecoilValue(prefPopsState)

  if (prefPops.length === 0) return <></>

  const options = {
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "都道府県人口推移",
      },
    },
    responsive: true,
  }

  const data = {
    datasets: prefPops.flatMap((prefPop) =>
      checkedPrefs.includes(prefPop.code.toString())
        ? {
            label: prefPop.name,
            borderColor: selectColor(prefPop.code),
            data: prefPop.population.map((pop) => pop.value),
          }
        : []
    ),
    labels: prefPops[0].population.map((prefPop) => prefPop.year),
  }

  return <Line data={data} options={options} />
}

export default PopulationChart
