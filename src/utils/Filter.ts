import { GameFilterDataQuery, GameFilterDataUrl } from "../models/types"

// Prepare filter for mongoose in the backend
  export const prepareFilterMongoose = (data: GameFilterDataUrl) => {
    const filterData: GameFilterDataQuery = {
      ...data,
      name: data.name && { $regex: data.name, $options: "i" },
      developers: data.developers && { $regex: data.developers, $options: "i" },
      publishers: data.publishers && { $regex: data.publishers, $options: "i" },
      tags: data.tags && { $regex: data.tags, $options: "i" },
      genres: data.genres && {$regex: data.genres, $options: "i"}
    }
    // Handle played hours, years and score possible range for mongoose query
    handleRangeForQuery(data, filterData, 'played_hours', 'played_hours_min', 'played_hours_max')
    handleRangeForQuery(data, filterData, 'played_year', 'played_year_min', 'played_year_max')
    handleRangeForQuery(data, filterData, 'release_year', 'release_year_min', 'release_year_max')
    handleRangeForQuery(data, filterData, 'score', 'score_min', 'score_max')

    return filterData
  }
  //......................................................

  const handleRangeForQuery = (data: any, filterData: GameFilterDataQuery, queryKey: string, minValueKey: string, maxValueKey: string) => {
    /**
     * Check the data containing the filters for a min and max values key
     * then depending on which one exists, give the filter data key a range or a single value
     * 
     * data: the one that comes from the form
     * filterData: the one to be sent to the api
     */
    if (data[minValueKey] && data[maxValueKey]) {
      // @ts-ignore
      filterData[queryKey] = {
        $lte: data[maxValueKey], $gte: data[minValueKey] 
      }
    } else if (data[minValueKey]) {
      // @ts-ignore
      filterData[queryKey] = {
        $gte: data[minValueKey] 
      }
    } else if (data[maxValueKey]) {
      // @ts-ignore
      filterData[queryKey] = {
        $lte: data[maxValueKey]
      }
    }
  }