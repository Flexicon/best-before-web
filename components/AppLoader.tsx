import { useEffect, useRef, useState } from 'react'
import { RiFridgeLine } from 'react-icons/ri'
import { CSSTransition } from 'react-transition-group'

type Props = {
  show: boolean
}

const AppLoader = ({ show }: Props) => {
  const nodeRef = useRef(null)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setInitialized(true), 1)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={show && initialized}
      timeout={500}
      classNames="app-loader"
      unmountOnExit
      mountOnEnter
    >
      <div
        ref={nodeRef}
        className="app-loader absolute z-50 flex h-screen w-screen items-center justify-center bg-gray-100"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="animate-bounce text-[4rem]">
            <RiFridgeLine />
          </span>
          <span className="text-xl font-semibold">Best Before</span>
        </div>
      </div>
    </CSSTransition>
  )
}

export default AppLoader
