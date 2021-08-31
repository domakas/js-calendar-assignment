(() => {

  window.Calendar = window.Calendar || {};
  const Calendar = window.Calendar;

  Calendar.HeaderComponent.init((currentDate) => {
    Calendar.EventManager.setState({
      currentDate,
    });
  });

  Calendar.EventManager.onChange((state, prevState) => {
    if (state.currentDate !== prevState.currentDate) {
      Calendar.HeaderComponent.render(state.currentDate);
    }
  });

})();