const initState = {
  currentText: "",
  wpm: 0,
  accuracy: 0,
  totalPressIn5: 0,
  wpmIn5: 0,
};

function AppReducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case "CHANGE": {
      return { ...state, currentText: payload };
    }
    case "SHOW": {
      return { ...state, wpm: payload.wpm, accuracy: payload.accuracy };
    }
    case "5MIN": {
      return {
        ...state,
        totalPressIn5: payload.totalCharacterTyped,
        wpmIn5: payload.WPM,
      };
    }

    default:
      return state;
  }
}
export { AppReducer };
