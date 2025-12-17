import { useSearchParams } from "react-router-dom";
import { GameFilterData, GameFilterDataUrl } from "../models/types";

export const useFilterData = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  
  const setFilterData = (data: GameFilterData) => {
    (Object.keys(data) as Array<keyof GameFilterData>).forEach(key => {
      if (!data[key]){
        delete data[key]
      }
    });
    const dataUrl: GameFilterDataUrl = {...data, completion: data.completion?._id, platform: data.platform?._id}
    if (!dataUrl.completion) delete dataUrl.completion
    if (!dataUrl.platform) delete dataUrl.platform
    setSearchParams(dataUrl)
  }

  const applyFilter = (data: GameFilterData) => {
    setFilterData(data)
  }

  const resetFilter = () => {
    setSearchParams('')
  }
    //......................................................

  return {
    applyFilter,
    resetFilter
  }
}