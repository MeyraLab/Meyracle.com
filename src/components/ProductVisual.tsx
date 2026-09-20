interface ProductVisualProps {
  productId: string
  compact?: boolean
}

function InkpaiVisual({ compact }: { compact: boolean }) {
  return (
    <div className="relative flex h-full min-h-52 overflow-hidden bg-ink text-white">
      <div className="absolute -right-10 -top-14 h-44 w-44 rounded-full bg-signal/90 blur-3xl" />
      <div className="absolute -bottom-20 left-1/4 h-48 w-48 rounded-full bg-peach/40 blur-3xl" />
      <div className="relative flex w-full flex-col justify-between p-5 sm:p-6">
        <div className="flex items-center justify-between text-[10px] text-white/55">
          <span className="font-mono">INKPAI / EDITOR</span>
          <span className="h-2 w-2 rounded-full bg-signal" />
        </div>
        <div className={compact ? "mt-12" : "mt-16"}>
          <p className="text-2xl font-medium tracking-[-0.04em] sm:text-3xl">排好，再发布。</p>
          <div className="mt-5 grid max-w-xs gap-2">
            <span className="h-px w-full bg-white/30" />
            <span className="h-px w-4/5 bg-white/20" />
            <span className="h-px w-3/5 bg-white/15" />
          </div>
        </div>
      </div>
    </div>
  )
}

function ExcerptVisual({ compact }: { compact: boolean }) {
  return (
    <div className="document-grid relative flex h-full min-h-52 overflow-hidden bg-surface text-text-primary">
      <div className="absolute right-0 top-0 h-full w-2 bg-signal" />
      <div className="flex w-full flex-col justify-between p-5 sm:p-6">
        <div className="flex items-center justify-between text-[10px] text-text-muted">
          <span className="font-mono">BK / EXCERPT</span>
          <span>文字成图</span>
        </div>
        <div className={compact ? "mt-10" : "mt-14"}>
          <span aria-hidden="true" className="font-serif text-6xl leading-none text-signal">
            “
          </span>
          <p className="-mt-3 max-w-xs font-serif text-xl leading-relaxed sm:text-2xl">
            让一段文字，
            <br />
            有自己的留白。
          </p>
        </div>
      </div>
    </div>
  )
}

export function ProductVisual({ productId, compact = false }: ProductVisualProps) {
  if (productId === 'inkpai') {
    return <InkpaiVisual compact={compact} />
  }

  return <ExcerptVisual compact={compact} />
}
