import React from "react"

type Props = Omit<JSX.IntrinsicElements["input"], "type">

const CheckBox: React.FC<Props> = ({ checked, name, value, onChange }) => (
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

export default CheckBox
