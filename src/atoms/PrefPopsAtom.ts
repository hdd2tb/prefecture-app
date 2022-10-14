import { atom } from "recoil"
import { InnerData } from "../hooks/usePopulation"

interface PrefPop {
  code: number
  name: string
  population: InnerData[]
}

export const prefPopsState = atom<PrefPop[]>({
  key: "prefPops",
  default: [],
})
