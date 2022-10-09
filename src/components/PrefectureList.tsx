import React from "react"
import usePrefectures, { Pref } from "../hooks/usePrefectures"
import CheckBox from "./CheckBox"

const listStyles = {
  columnCount: 2,
}

const PrefectureList: React.FC = () => {
  const { data } = usePrefectures()
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

  return (
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
  )
}

export default PrefectureList
