// themeReducer.js
const TOGGLE_THEME = 'TOGGLE_THEME';

export const toggleTheme = () => ({
  type: TOGGLE_THEME,
});

const initialState = {
  darkMode: false,
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    default:
      return state;
  }
};

export default themeReducer;
