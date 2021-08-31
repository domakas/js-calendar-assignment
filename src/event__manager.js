(() => {
  window.Calendar = window.Calendar || {};
  const Calendar = window.Calendar;

  let state = {};
  let callbacks = [];

  Calendar.EventManager = {
    setState: (newState) => {
      const prevState = state;
      state = {
        ...state,
        ...newState,
      };

      callbacks.forEach((cb) => cb(state, prevState));
    },
    onChange: (callback) => {
      callbacks.push(callback);
    },
  };

})();