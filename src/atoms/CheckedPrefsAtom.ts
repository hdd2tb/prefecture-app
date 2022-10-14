import { atom } from "recoil"

export const checkedPrefsState = atom<string[]>({
  key: "checkedPrefs",
  default: [],
})
