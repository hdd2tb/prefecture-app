import React, { useEffect } from "react"
import { useRecoilState } from "recoil"
import { prefPopsState } from "../atoms/PrefPopsAtom"
import usePopulation from "../hooks/usePopulation"

type Props = Omit<JSX.IntrinsicElements["input"], "name" | "type" | "value"> & {
  name: string
  value: number
}

const CheckBox: React.FC<Props> = ({ checked, name, value, onChange }) => {
  const [prefPops, setPrefPops] = useRecoilState(prefPopsState)
  const { data } = usePopulation(value, checked)

  useEffect(() => {
    if (
      checked &&
      data?.result &&
      prefPops.filter((prefPop) => prefPop.name === name).length === 0
    ) {
      setPrefPops((prefPops) => [
        ...prefPops,
        { code: value, name, population: data.result.data[0].data },
      ])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, checked])

  return (
    <div>
      <input
        checked={checked}
        name={name}
        type="checkbox"
        value={value}
        onChange={onChange}
      />
      {name}
    </div>
  )
}

export default CheckBox
