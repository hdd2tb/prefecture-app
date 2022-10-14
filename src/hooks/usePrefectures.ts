import axios from "axios"
import useSWR from "swr"

export interface Pref {
  prefCode: number
  prefName: string
}

interface FetcherReturn {
  description?: string
  message?: string | null
  result?: Pref[]
  statusCode?: string
}

const fetcher = (
  url: string,
  headers: { [key: string]: string }
): Promise<FetcherReturn> =>
  axios
    .get(url, {
      headers,
    })
    .then((res) => res.data)

const usePrefectures = (suspense = true) => {
  const { data, error } = useSWR(
    [
      "https://opendata.resas-portal.go.jp/api/v1/prefectures",
      { "X-API-KEY": process.env.GATSBY_RESAS_API_KEY },
    ],
    fetcher,
    { suspense }
  )

  return {
    loading: !error && !data,
    error,
    data,
  }
}

export default usePrefectures
