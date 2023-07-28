import { ChevronIcon } from '~/icons/ChevronIcon'
import styles from './BackButton.module.css'

const handleClick = () => {
  window.history.back()
}

export const BackButton = () => {
  return (
    <button type="button" onClick={handleClick} className={styles.back_button}>
      <ChevronIcon className={styles.back_button__icon} />
      Back
    </button>
  )
}
