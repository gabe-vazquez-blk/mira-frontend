const defaultState = {
  stocks: [],
  watchlist: [],
  filter: '',
  searchresult: '',
  currentStock: {},
  showStock: {
    id: 17,
    ticker: "ADS",
    e_score: 61,
    e_percentile: 78,
    s_score: 41,
    s_percentile: 18,
    g_score: 74,
    g_percentile: 93,
    total_score: 55,
    total_percentile: 74
  },
  news: []
}

function stocksReducer(prevState = defaultState, action) {
  switch (action.type) {
    case "STOCKS":
      return { ...prevState, stocks: action.payload }
    case "WATCHLIST":
      return { ...prevState, watchlist: action.payload, currentStock: action.payload[0] || {} }
    case "FILTER":
      return { ...prevState, filter: action.payload }
    case "SEARCHRESULT":
      return { ...prevState, searchresult: action.payload }
    case "CURRENTSTOCK":
      return { ...prevState, currentStock: action.payload }
    case "SHOWSTOCK":
      return { ...prevState, showStock: action.payload }
    case "NEWS":
      return { ...prevState, news: action.payload }
    default:
      return prevState
  }
}

export default stocksReducer