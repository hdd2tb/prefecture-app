import React from "react"
import { useRecoilState } from "recoil"
import { checkedPrefsState } from "../atoms/CheckedPrefsAtom"
import usePrefectures, { Pref } from "../hooks/usePrefectures"
import CheckBox from "./CheckBox"

const listStyles = {
  columnCount: 2,
}

const PrefectureList: React.FC = () => {
  const { data } = usePrefectures()
  const [checkedPrefs, setCheckedPrefs] = useRecoilState(checkedPrefsState)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (event.target.checked) {
      setCheckedPrefs((checkedPrefs) => [...checkedPrefs, value])
    } else {
      setCheckedPrefs((checkedPrefs) =>
        checkedPrefs.filter((pref) => pref !== value)
      )
    }
  }

  return (
    <>
      <h1>都道府県</h1>
      <ul style={listStyles}>
        {data?.result?.map((pref: Pref) => (
          <div key={pref.prefCode}>
            <CheckBox
              checked={checkedPrefs.includes(pref.prefCode.toString())}
              name={pref.prefName}
              value={pref.prefCode}
              onChange={onChange}
            />
          </div>
        ))}
      </ul>
    </>
  )
}

export default PrefectureList
