import axios from "axios"
import useSWR from "swr"

interface InnerData {
  year: number
  value: number
}

interface Data {
  label: string
  data: InnerData[]
}

interface Result {
  boundaryYear: number
  data: Data[]
}

interface fetchReturn {
  description?: string
  message?: string | null
  result?: Result | null
  statusCode?: string
}

interface Props {
  prefCode: number
}

const fetcher = (
  url: string,
  headers: { [key: string]: string },
  params: { [key: string]: string }
): Promise<fetchReturn> =>
  axios
    .get(url, {
      headers,
      params,
    })
    .then((res) => res.data)

const usePopulation = ({ prefCode }: Props) => {
  const { data, error } = useSWR(
    [
      "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear",
      { "X-API-KEY": process.env.GATSBY_RESAS_API_KEY },
      { cityCode: "-", prefCode },
    ],
    fetcher
  )

  return {
    loading: !error && !data,
    error,
    data,
  }
}

export default usePopulation
