import { ChevronIcon } from "~/icons/ChevronIcon"
import "./BackButton.css"
import { Button } from "./Button"

const handleClick = () => {
  window.history.back()
}

export const BackButton = () => {
  return (
    <Button type="button" onClick={handleClick} className="back_button">
      <ChevronIcon className="back_button__icon" />
      Back
    </Button>
  )
}
