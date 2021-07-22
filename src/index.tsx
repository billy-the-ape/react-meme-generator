import React, { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'

export type MemeGeneratorProps = React.HTMLAttributes<HTMLDivElement> & {
  // Meme api to use
  memeApiUrl?: string
  // Hard coded specific urls
  memeUrls?: string[]
  // Will append api results to urls
  appendApiResults?: boolean
}

const DEFAULT_MEME_API_URL = 'https://api.imgflip.com/get_memes'

const useStyles = createUseStyles({
  selection: {},
  form: {},
  imgs: {},
  img: {},
  meme: {},
  top: {},
  bottom: {}
})

export const MemeGenerator: React.FC<MemeGeneratorProps> = ({
  memeApiUrl = DEFAULT_MEME_API_URL,
  memeUrls = [],
  appendApiResults = false,
  ...divProps
}) => {
  const classes = useStyles()

  const [topText, setTopText] = useState('')
  const [bottomText, setBottomText] = useState('')

  const [memes, setMemes] = useState(memeUrls)
  const [selectedMeme, setSelectedMeme] = useState('')

  useEffect(() => {
    if (memeUrls.length && !appendApiResults) return

    const checkMemes = async () => {
      const {
        data: { apiMemes }
      } = await (await fetch(memeApiUrl)).json()

      setMemes([...memes, ...apiMemes])
    }
    checkMemes()
  }, [])

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { name, value }
  }) => {
    if (name === 'top') {
      setTopText(value)
    } else if (name === 'bottom') {
      setBottomText(value)
    }
  }

  return (
    <div {...divProps}>
      <div className={classes.selection}>
        <form
          className={classes.form}
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <input
            placeholder='Enter Text'
            type='text'
            value={topText}
            name='top'
            onChange={handleChange}
          />
          <input
            placeholder='Enter Text'
            type='text'
            value={bottomText}
            name='bottom'
            onChange={handleChange}
          />
          <button>Generate</button>
        </form>
        <div className={classes.imgs}>
          {memes.map((url) => (
            <img
              className={classes.img}
              onClick={() => setSelectedMeme(url)}
              src={url}
            />
          ))}
        </div>
      </div>
      <br />
      <div className={classes.meme}>
        {selectedMeme === '' ? '' : <img src={selectedMeme} alt='meme' />}
        {selectedMeme === '' ? '' : <h2 className={classes.top}>{topText}</h2>}
        {selectedMeme === '' ? (
          ''
        ) : (
          <h2 className={classes.bottom}>{bottomText}</h2>
        )}
      </div>
    </div>
  )
}
