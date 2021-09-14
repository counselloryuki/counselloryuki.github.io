;document.addEventListener('DOMContentLoaded', (event) => {
  const storageKey = 'counselloryuki';
  const persistedSelector = 'input[type="checkbox"].persisted';
  const mainDiv = document.querySelector('div#main');
  const persistedCheckBoxes = document.querySelectorAll(persistedSelector);
  const persistedCheckBoxesSize = persistedCheckBoxes ? persistedCheckBoxes.length : 0;

  if (mainDiv && persistedCheckBoxesSize > 0) {
    const myStorage = JSON.parse(localStorage.getItem(storageKey) || '{}');

    for (let i=0; i <= persistedCheckBoxesSize; i++) {
      if (persistedCheckBoxes[i] && persistedCheckBoxes[i].id) {
        persistedCheckBoxes[i].checked = myStorage[persistedCheckBoxes[i].id];
      }
    }

    mainDiv.addEventListener('click', (event) => {
      if (event.target.matches(persistedSelector) && event.target.id) {
          myStorage[event.target.id] = event.target.checked
          localStorage.setItem(storageKey, JSON.stringify(myStorage));
      }
    }, false);
  }
});
