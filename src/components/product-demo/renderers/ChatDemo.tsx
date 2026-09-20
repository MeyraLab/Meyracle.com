import { useLayoutEffect, useRef } from 'react'
import { DEMO_MAX_VISIBLE } from '../useDemoPlayback'
import type { ChatDemoScript, ChatMessage } from '../types'

const ENTER_MS = 400
const ENTER_EASING = 'cubic-bezier(0, 0, 0.2, 1)'

interface ChatDemoProps {
  script: ChatDemoScript
  visibleCount: number
  cycle: number
  animate: boolean
}

function ChatBubble({ message, animate }: { message: ChatMessage; animate: boolean }) {
  const isUser = message.role === 'user'

  return (
    <div className={`chat-demo__row${isUser ? ' chat-demo__row--user' : ''}`}>
      <p
        className={`chat-demo__bubble${isUser ? ' chat-demo__bubble--user' : ' chat-demo__bubble--assistant'}${
          animate ? ' chat-demo__bubble--enter' : ''
        }`}
      >
        {message.text}
      </p>
    </div>
  )
}

export function ChatDemo({ script, visibleCount, cycle, animate }: ChatDemoProps) {
  const stackRef = useRef<HTMLDivElement>(null)
  const prevHeightRef = useRef(0)
  const cycleRef = useRef(cycle)

  const start = Math.max(0, visibleCount - DEMO_MAX_VISIBLE)
  const messages = script.messages.slice(start, visibleCount)

  useLayoutEffect(() => {
    const stack = stackRef.current
    if (!stack) return

    const height = stack.offsetHeight
    const cycleChanged = cycleRef.current !== cycle
    cycleRef.current = cycle
    const previousHeight = prevHeightRef.current
    prevHeightRef.current = height

    if (!animate || cycleChanged || previousHeight === 0 || height <= previousHeight) {
      return
    }

    const dy = height - previousHeight
    stack.animate([{ transform: `translateY(${dy}px)` }, { transform: 'translateY(0)' }], {
      duration: ENTER_MS,
      easing: ENTER_EASING,
      fill: 'none',
    })
  }, [animate, cycle, visibleCount])

  return (
    <div className="chat-demo">
      <div ref={stackRef} className="chat-demo__stack" key={cycle}>
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} animate={animate} />
        ))}
      </div>
    </div>
  )
}
