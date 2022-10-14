import type { HeadFC } from "gatsby"
import React, { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { RecoilRoot } from "recoil"
import PopulationChart from "../components/PopulationChart"
import PrefectureList from "../components/PrefectureList"

const IndexPage = () => (
  <main>
    <RecoilRoot>
      <ErrorBoundary fallback={<p>Error...</p>}>
        <Suspense fallback={<p>Loading...</p>}>
          <PrefectureList />
        </Suspense>
      </ErrorBoundary>
      <PopulationChart />
    </RecoilRoot>
  </main>
)

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
