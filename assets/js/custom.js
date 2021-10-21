;document.addEventListener('DOMContentLoaded', (event) => {
  const storageKey = 'counselloryuki';
  const persistedSelector = 'input[type="checkbox"].persisted';
  const clearButtonSelector = 'button[name="clear-checkboxes"]';
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
      if (event.target.matches(clearButtonSelector) && event.target.value) {
        if (confirm("Are you sure to reset all the checkboxes in this page?")) {
          const checkboxPrefix = new RegExp(event.target.value);
          for (const key in myStorage) {
            if (myStorage.hasOwnProperty(key) && key.match(checkboxPrefix)) {
              delete myStorage[key];
              document.querySelector(persistedSelector+"#"+key).checked = false;
            }
          }
          localStorage.setItem(storageKey, JSON.stringify(myStorage));
        }
      }
    }, false);
  }
});
