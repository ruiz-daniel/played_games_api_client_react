import { useState } from "react";

export function useToggle(defaultValue?: boolean) {
  const [toggleValue, setValue] = useState(defaultValue ?? false)

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