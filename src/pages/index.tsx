import type { HeadFC } from "gatsby"
import React from "react"
import PopulationChart from "../components/PopulationChart"
import usePopulation from "../hooks/usePopulation"
import usePrefectures, { Pref } from "../hooks/usePrefectures"

const listStyle = {
  columnCount: 2,
}

const listItemStyle = {
  margin: 0,
}

const IndexPage = () => {
  const [checkedPrefs, setCheckedPrefs] = React.useState<string[]>([])
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (event.target.checked) {
      checkedPrefs.push(value)
    } else {
      checkedPrefs.splice(checkedPrefs.indexOf(value), 1)
    }
    setCheckedPrefs([...checkedPrefs])
  }
  const {
    loading: loadingPref,
    error: errorPref,
    data: dataPref,
  } = usePrefectures()
  const {
    loading: loadingPop,
    error: errorPop,
    data: dataPop,
  } = usePopulation({
    prefCode: 20,
  })

  return (
    <main>
      {loadingPref || loadingPop || errorPref || errorPop ? (
        <h1>Something Wrong</h1>
      ) : (
        <div>
          <h1>都道府県</h1>
          <ul style={listStyle}>
            {dataPref?.result?.map((pref: Pref) => (
              <p key={pref.prefCode} style={listItemStyle}>
                <input
                  checked={checkedPrefs.includes(pref.prefName)}
                  name="prefecture"
                  type="checkbox"
                  value={pref.prefName}
                  onChange={onChange}
                />
                {pref.prefName}
              </p>
            ))}
          </ul>
          <PopulationChart
            data={dataPop?.result ? [dataPop.result.data[0].data] : undefined}
          />
        </div>
      )}
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
