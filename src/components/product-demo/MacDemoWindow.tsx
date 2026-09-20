import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import type { DemoMacWindow } from './types'

interface MacDemoWindowProps extends DemoMacWindow {
  children: ReactNode
}

export function MacDemoWindow({ title, status, children }: MacDemoWindowProps) {
  return (
    <div className="mac-demo-window">
      <div className="mac-demo-window__titlebar">
        <div className="mac-demo-window__lights" aria-hidden="true">
          <span className={cn('mac-demo-window__dot', 'mac-demo-window__dot--close')} />
          <span className={cn('mac-demo-window__dot', 'mac-demo-window__dot--min')} />
          <span className={cn('mac-demo-window__dot', 'mac-demo-window__dot--max')} />
        </div>
        <p className="mac-demo-window__title">{title}</p>
        {status ? <p className="mac-demo-window__status">{status}</p> : null}
      </div>
      <div className="mac-demo-window__body">{children}</div>
    </div>
  )
}
