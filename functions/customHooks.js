import { useState, useRef } from "react";


export const useStateWithRef = (initialValue) => {
  const ref = useRef(initialValue);
  const [state, setState] = useState(initialValue);

  const updateState = (newState) => {
    ref.current = typeof newState === 'function' ? newState(state) : newState;
    setState(ref.current);
  }

  return [state, updateState, ref];
}