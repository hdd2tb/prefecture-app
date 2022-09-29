import { useCallback, useEffect, useMemo, useState } from "react"
import axios, { AxiosError, Method } from "axios"

interface FetchRequest<T> {
  method?: "get" | "post"
  url: string
  params?: Params
  headers?: Headers
  skip?: boolean
  onSuccess?: (data?: T) => void
  onError?: (err: any) => void
}

type Refetch<T> = ({ url, params }?: RefetchArgs<T>) => Promise<T | null>

interface FetchResponse<T> {
  data?: T | null
  refetch: Refetch<T>
  error: any
  hasError: boolean
  isLoading: boolean
}

interface Headers {
  [key: string]: any
}

interface Params {
  [key: string]: any
}

interface RefetchArgs<T> {
  url?: string
  method?: Pick<Method, "get" & "post">
  params?: Params
  body?: Params
  onSuccess?: (data?: T) => void
  onError?: (err: AxiosError) => void
}
export function useFetch<T>({
  url,
  method = "get",
  params,
  headers,
  skip = false,
  onError,
}: FetchRequest<T>): FetchResponse<T> {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState<AxiosError | null>(null)
  const [hasError, setHasError] = useState(false)

  const memoizeUrl = useMemo(() => url, [url])
  const refetch = useCallback<Refetch<T>>(
    async <T>(args?: RefetchArgs<T>) => {
      try {
        setLoading(true)

        const axiosInstance = axios[method]
        const res = await axiosInstance(`${memoizeUrl}`, params, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...headers,
          },
        })

        const data = res.data
        setData(data)
        args?.onSuccess?.(data)
        return data
      } catch (err) {
        onError?.(err)
        setError(err as AxiosError)
        setHasError(true)
        return null
      } finally {
        setLoading(false)
      }
    },
    [headers, memoizeUrl, method, onError, params]
  )

  const clear = useCallback(() => {
    setData(null)
    setLoading(false)
    setHasError(false)
    setError(null)
  }, [])

  useEffect(() => {
    if (skip) return
    if (memoizeUrl) {
      const f = async () => {
        const res = await refetch({})
        res && setData(res)
      }
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      f()
    }
    return () => clear()
  }, [memoizeUrl])
  return {
    data,
    refetch,
    error,
    hasError,
    isLoading,
  }
}
