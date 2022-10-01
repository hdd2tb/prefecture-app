import axios from "axios"
import type { HeadFC } from "gatsby"
import React from "react"
import useSWR from "swr"

const listStyle = {
  columnCount: 2,
}

const listItemStyle = {
  margin: 0,
}

interface pref {
  prefCode: number
  prefName: string
}

interface fetchGetReturn {
  description?: string
  message?: string | null
  result?: pref[]
  statusCode?: string
}

const IndexPage = () => {
  const [checked, setChecked] = React.useState<string[]>([])
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (event.target.checked) {
      checked.push(value)
    } else {
      checked.splice(checked.indexOf(value), 1)
    }
    setChecked([...checked])
  }
  const fetcher = (url: string, apiKey: string): Promise<fetchGetReturn> =>
    axios
      .get(url, {
        headers: { "X-API-KEY": apiKey },
      })
      .then((res) => res.data)
  const { data, error } = useSWR(
    [
      "https://opendata.resas-portal.go.jp/api/v1/prefectures",
      process.env.GATSBY_RESAS_API_KEY,
    ],
    fetcher
  )

  return (
    <main>
      {error || !data?.result ? (
        <h1>Something Wrong</h1>
      ) : (
        <div>
          <h1>都道府県</h1>
          <ul style={listStyle}>
            {data?.result?.map((pref: pref) => (
              <p key={pref.prefCode} style={listItemStyle}>
                <input
                  checked={checked.includes(pref.prefName)}
                  name="prefecture"
                  type="checkbox"
                  value={pref.prefName}
                  onChange={onChange}
                />
                {pref.prefName}
              </p>
            ))}
          </ul>
        </div>
      )}
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
