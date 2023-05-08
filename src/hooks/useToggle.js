import { useState } from "react";

export function useToggle() {
  const [toggleValue, setValue] = useState(false)

  const toggle = () => {
    setValue(!toggleValue)
  }

  const toggleON = () => {
    setValue(true)
  }

  const toggleOFF = () => {
    setValue(false)
  }

  return { toggleValue, toggle, toggleON, toggleOFF }
}