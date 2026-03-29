import { quotes } from '@onequote/shared'
import { useEffect, useRef, useState } from 'react'
import { NEWLINE_REGEX } from '~/logics'
import '~/styles/onequote.css'

export default function OneQuote() {
  const [num, setNum] = useState(0)
  const intervalIdRef = useRef<number | null>(null)

  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      setNum(Math.round(Math.random() * (quotes.length - 1)))
    }, 5000) as unknown as number

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current)
        intervalIdRef.current = null
      }
    }
  }, [])

  return (
    <>
      <div className="onequote-wrapper">
        <div className="onequote-fullpage">
          <div className="quote-area">
            <div className="bracket left">
              『
            </div>
            { // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml
              <div className="word" dangerouslySetInnerHTML={{ __html: quotes[num]?.content.replace(NEWLINE_REGEX, '<br>') }} />
            }
            <div className="bracket right">
              』
            </div>
          </div>
          {quotes[num]?.comeFrom && (
            <div className="author">
              ——
              {' '}
              { quotes[num]?.comeFrom?.someone || '' }
              { quotes[num]?.comeFrom?.somewhere ? `「${quotes[num]?.comeFrom?.somewhere}」` : '' }
            </div>
          )}
        </div>
      </div>
    </>
  )
}
