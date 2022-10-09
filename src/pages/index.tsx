import type { HeadFC } from "gatsby"
import React, { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import PopulationChart from "../components/PopulationChart"
import PrefectureList from "../components/PrefectureList"
import usePopulation from "../hooks/usePopulation"

const IndexPage = () => {
  const {
    loading: loadingPop,
    error: errorPop,
    data: dataPop,
  } = usePopulation({
    prefCode: 20,
  })

  return (
    <main>
      {loadingPop || errorPop || !dataPop?.result ? (
        <h1>Something Wrong</h1>
      ) : (
        <div>
          <h1>都道府県</h1>
          <ErrorBoundary fallback={<p>Error...</p>}>
            <Suspense fallback={<p>Loading...</p>}>
              <PrefectureList />
            </Suspense>
          </ErrorBoundary>
          <PopulationChart data={[dataPop.result.data[0].data]} />
        </div>
      )}
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
