import { useCallback, useEffect, useRef, type PointerEvent } from 'react'

type TemplateId =
  | 'minimal'
  | 'magazine'
  | 'blush'
  | 'editorial'
  | 'ink'
  | 'noir'
  | 'notebook'
  | 'sage'

interface TemplateCard {
  id: TemplateId
  title: string
  subtitle: string
}

const TEMPLATES: readonly TemplateCard[] = [
  { id: 'minimal', title: '极简', subtitle: '居中标题 · 细线' },
  { id: 'magazine', title: '杂志风', subtitle: '大字距 · 衬线刊头' },
  { id: 'blush', title: 'Soft Blush', subtitle: '浅粉留白 · 玫瑰标题' },
  { id: 'editorial', title: '2020s', subtitle: '扇贝海报 · 编辑美学' },
  { id: 'ink', title: '墨染刊面', subtitle: '金线引用 · 长文' },
  { id: 'noir', title: '黑金序', subtitle: '深底 · 序言' },
  { id: 'notebook', title: '手账', subtitle: '暖纸 · 虚线' },
  { id: 'sage', title: '松烟翠', subtitle: '书卷 · 深读' },
]

const MATRIX = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
] as const

function TemplateSheet({ id }: { id: TemplateId }) {
  if (id === 'minimal') {
    return (
      <div className="inkpai-sheet inkpai-sheet--minimal">
        <span>01</span>
        <strong>留白</strong>
        <i />
        <p>句子回到该在的位置。</p>
      </div>
    )
  }
  if (id === 'magazine') {
    return (
      <div className="inkpai-sheet inkpai-sheet--magazine">
        <span>ISSUE</span>
        <strong>刊头</strong>
        <p>字距拉开的封面标题。</p>
      </div>
    )
  }
  if (id === 'blush') {
    return (
      <div className="inkpai-sheet inkpai-sheet--blush">
        <strong>玫瑰</strong>
        <em>浅粉里的杂志标题</em>
        <p>留白比装饰更多。</p>
      </div>
    )
  }
  if (id === 'editorial') {
    return (
      <div className="inkpai-sheet inkpai-sheet--editorial">
        <i />
        <div>
          <strong>2020s</strong>
          <em>编辑美学</em>
        </div>
        <i />
      </div>
    )
  }
  if (id === 'ink') {
    return (
      <div className="inkpai-sheet inkpai-sheet--ink">
        <span>EDITORIAL</span>
        <strong>墨染</strong>
        <p>金线压住一句引用。</p>
      </div>
    )
  }
  if (id === 'noir') {
    return (
      <div className="inkpai-sheet inkpai-sheet--noir">
        <span>NO. 12</span>
        <strong>序</strong>
        <i />
        <p>深底上的开篇。</p>
      </div>
    )
  }
  if (id === 'notebook') {
    return (
      <div className="inkpai-sheet inkpai-sheet--notebook">
        <span>NOTE</span>
        <strong>今日</strong>
        <i />
        <p>短记顺着虚线往下走。</p>
      </div>
    )
  }
  return (
    <div className="inkpai-sheet inkpai-sheet--sage">
      <strong>松烟</strong>
      <p>适合慢慢读完的一章。</p>
      <span>深度</span>
    </div>
  )
}

export function InkpaiCanvasDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const blockRef = useRef<HTMLDivElement>(null)
  const currentPos = useRef({ x: 0, y: 0 })
  const targetPos = useRef({ x: 0, y: 0 })
  const velocity = useRef({ vx: 0, vy: 0 })
  const blockDim = useRef({ w: 0, h: 0 })
  const isDragging = useRef(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const dragStartTarget = useRef({ x: 0, y: 0 })
  const lastPointer = useRef({ x: 0, y: 0, time: 0 })
  const ready = useRef(false)
  const visible = useRef(true)
  const reduceMotion = useRef(false)

  const measureAndCenter = useCallback(() => {
    const block = blockRef.current
    const container = containerRef.current
    if (!block || !container) return
    const rect = block.getBoundingClientRect()
    const cw = container.clientWidth
    const ch = container.clientHeight
    if (rect.width <= 0 || rect.height <= 0 || cw <= 0 || ch <= 0) return
    blockDim.current = { w: rect.width, h: rect.height }
    if (ready.current) return
    const initX = (cw - block.offsetWidth) / 2 - block.offsetLeft
    const initY = 6 - block.offsetTop
    currentPos.current = { x: initX, y: initY }
    targetPos.current = { x: initX, y: initY }
    if (gridRef.current) {
      gridRef.current.style.transform = `translate3d(${initX.toFixed(2)}px, ${initY.toFixed(2)}px, 0)`
    }
    ready.current = true
  }, [])

  useEffect(() => {
    reduceMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    measureAndCenter()
    const container = containerRef.current
    const observer = container ? new ResizeObserver(measureAndCenter) : null
    if (container && observer) observer.observe(container)
    const view = container
      ? new IntersectionObserver(([entry]) => {
          visible.current = entry.isIntersecting
        })
      : null
    if (container && view) view.observe(container)

    let frame = 0
    const render = () => {
      frame = requestAnimationFrame(render)
      if (!visible.current) return
      const { w, h } = blockDim.current
      if (!isDragging.current) {
        if (Math.abs(velocity.current.vx) > 0.01 || Math.abs(velocity.current.vy) > 0.01) {
          velocity.current.vx *= 0.95
          velocity.current.vy *= 0.95
          targetPos.current.x += velocity.current.vx
          targetPos.current.y += velocity.current.vy
        }
      }
      const lerp = isDragging.current ? 0.16 : 0.09
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerp
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerp
      if (w > 0 && h > 0) {
        while (currentPos.current.x < -w * 1.75) {
          currentPos.current.x += w
          targetPos.current.x += w
          dragStartTarget.current.x += w
        }
        while (currentPos.current.x > -w * 0.25) {
          currentPos.current.x -= w
          targetPos.current.x -= w
          dragStartTarget.current.x -= w
        }
        while (currentPos.current.y < -h * 1.75) {
          currentPos.current.y += h
          targetPos.current.y += h
          dragStartTarget.current.y += h
        }
        while (currentPos.current.y > -h * 0.25) {
          currentPos.current.y -= h
          targetPos.current.y -= h
          dragStartTarget.current.y -= h
        }
      }
      const skewX = reduceMotion.current ? 0 : Math.max(Math.min(velocity.current.vx * 0.06, 1.6), -1.6)
      const skewY = reduceMotion.current ? 0 : Math.max(Math.min(velocity.current.vy * 0.06, 1.6), -1.6)
      if (gridRef.current) {
        gridRef.current.style.transform = `translate3d(${currentPos.current.x.toFixed(2)}px, ${currentPos.current.y.toFixed(2)}px, 0) skew(${skewX.toFixed(2)}deg, ${skewY.toFixed(2)}deg)`
      }
    }
    frame = requestAnimationFrame(render)
    return () => {
      cancelAnimationFrame(frame)
      observer?.disconnect()
      view?.disconnect()
    }
  }, [measureAndCenter])

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 && event.pointerType === 'mouse') return
    event.preventDefault()
    event.stopPropagation()
    isDragging.current = true
    dragStart.current = { x: event.clientX, y: event.clientY }
    dragStartTarget.current = { ...targetPos.current }
    lastPointer.current = { x: event.clientX, y: event.clientY, time: performance.now() }
    velocity.current = { vx: 0, vy: 0 }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return
    event.preventDefault()
    event.stopPropagation()
    const dx = (event.clientX - dragStart.current.x) * 0.85
    const dy = (event.clientY - dragStart.current.y) * 0.85
    const now = performance.now()
    const dt = Math.max(now - lastPointer.current.time, 1)
    const vx = ((event.clientX - lastPointer.current.x) / dt) * 12
    const vy = ((event.clientY - lastPointer.current.y) / dt) * 12
    velocity.current = {
      vx: velocity.current.vx * 0.25 + vx * 0.75,
      vy: velocity.current.vy * 0.25 + vy * 0.75,
    }
    lastPointer.current = { x: event.clientX, y: event.clientY, time: now }
    targetPos.current.x = dragStartTarget.current.x + dx
    targetPos.current.y = dragStartTarget.current.y + dy
  }

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return
    isDragging.current = false
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  return (
    <div
      ref={containerRef}
      className="inkpai-canvas"
      aria-hidden="true"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
      }}
    >
      <div className="inkpai-canvas__glow inkpai-canvas__glow--a" />
      <div className="inkpai-canvas__glow inkpai-canvas__glow--b" />
      <div ref={gridRef} className="inkpai-canvas__grid">
        {MATRIX.map((row, rowIndex) =>
          row.map((blockId, colIndex) => {
            const center = rowIndex === 1 && colIndex === 1
            return (
              <div
                key={blockId}
                ref={center ? blockRef : undefined}
                className="inkpai-canvas__block"
              >
                {TEMPLATES.map((item) => (
                  <article key={`${blockId}-${item.id}`} className="inkpai-canvas__card">
                    <TemplateSheet id={item.id} />
                    <p className="inkpai-canvas__title">{item.title}</p>
                    <p className="inkpai-canvas__subtitle">{item.subtitle}</p>
                  </article>
                ))}
              </div>
            )
          }),
        )}
      </div>
    </div>
  )
}
