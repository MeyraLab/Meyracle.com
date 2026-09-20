import type { EditorDemoScript, ExcerptThemeId } from '../types'

interface EditorPreviewDemoProps {
  script: EditorDemoScript
  step: number
  cycle: number
  animate: boolean
}

function BookThumb() {
  return (
    <span className="excerpt-demo__thumb" aria-hidden="true">
      <span className="excerpt-demo__thumb-page">
        <span />
        <span />
        <span />
        <span />
      </span>
    </span>
  )
}

export function EditorPreviewDemo({ script, step, cycle, animate }: EditorPreviewDemoProps) {
  const uploaded = step >= 1
  const recognizing = step === 2
  const recognized = step >= 3
  const sourced = step >= 4
  const paper = step >= 5
  const complete = step >= 6
  const theme: ExcerptThemeId = paper ? 'paper' : 'ink'
  const enter = animate ? ' excerpt-demo__enter' : ''

  return (
    <div className="excerpt-demo" key={cycle}>
      <div className="excerpt-demo__editor">
        <div className={`excerpt-demo__upload${uploaded ? ' is-ready' : ''}${step === 1 ? ' is-hot' : ''}`}>
          {uploaded ? <BookThumb /> : null}
          <span className={uploaded && animate ? 'excerpt-demo__enter' : undefined}>
            {uploaded ? '已上传图片' : '上传图片'}
          </span>
        </div>

        <div className="excerpt-demo__field">
          <span className="excerpt-demo__label">摘抄正文</span>
          <p className="excerpt-demo__value">
            {recognizing ? (
              <span className={enter}>{script.recognizeLabel}</span>
            ) : recognized ? (
              <span className={enter}>{script.quote}</span>
            ) : (
              <span className="excerpt-demo__placeholder">摘抄正文</span>
            )}
          </p>
        </div>

        <div className="excerpt-demo__meta">
          <div className="excerpt-demo__field">
            <span className="excerpt-demo__label">来源 / 标题</span>
            <p className="excerpt-demo__value">
              {sourced ? (
                <span className={enter}>{script.title}</span>
              ) : (
                <span className="excerpt-demo__placeholder">来源 / 标题</span>
              )}
            </p>
          </div>
          <div className="excerpt-demo__field">
            <span className="excerpt-demo__label">署名</span>
            <p className="excerpt-demo__value">
              {sourced ? (
                <span className={enter}>{script.byline}</span>
              ) : (
                <span className="excerpt-demo__placeholder">署名</span>
              )}
            </p>
          </div>
        </div>

        <div className="excerpt-demo__themes">
          {script.themes.map((item) => (
            <span
              key={item.id}
              className={`excerpt-demo__theme${theme === item.id ? ' is-active' : ''}`}
            >
              {item.label}
            </span>
          ))}
        </div>
      </div>

      <div className="excerpt-demo__preview">
        <div
          className={`excerpt-demo__card excerpt-demo__card--${theme}${complete ? ' is-complete' : ''}${
            step === 5 && animate ? ' excerpt-demo__card--refresh' : ''
          }`}
        >
          <p className="excerpt-demo__card-kicker">书摘</p>
          <p className="excerpt-demo__card-quote">
            {recognized ? script.quote : '上传图片后生成预览'}
          </p>
          <div className="excerpt-demo__card-foot">
            <span>{sourced ? script.title : '来源'}</span>
            <span>{sourced ? script.byline : '署名'}</span>
          </div>
        </div>
        {complete ? <p className={`excerpt-demo__done${enter}`}>{script.doneLabel}</p> : null}
      </div>
    </div>
  )
}
