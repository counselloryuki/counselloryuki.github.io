;document.addEventListener('DOMContentLoaded', (event) => {
  const storageKey = 'counselloryuki';
  const persistedTextSelector = 'input[type="text"].persisted';
  const persistedCheckboxSelector = 'input[type="checkbox"].persisted';
  const persistedBothSelectors = 'input.persisted[type="checkbox"],[type="text"]';
  const clearButtonSelector = 'button[name="clear-checkboxes"]';
  const mainDiv = document.querySelector('div#main');
  const persistedCheckBoxes = document.querySelectorAll(persistedBothSelectors);
  const persistedCheckBoxesSize = persistedCheckBoxes ? persistedCheckBoxes.length : 0;

  if (mainDiv && persistedCheckBoxesSize > 0) {
    const myStorage = JSON.parse(localStorage.getItem(storageKey) || '{}');
    for (let i=0; i <= persistedCheckBoxesSize; i++) {
      if (persistedCheckBoxes[i] && persistedCheckBoxes[i].id) {
        if (persistedCheckBoxes[i].type === 'checkbox') {
          persistedCheckBoxes[i].checked = myStorage[persistedCheckBoxes[i].id];
        } else {  // text
          persistedCheckBoxes[i].value = myStorage[persistedCheckBoxes[i].id] || '';
        }
      }
    }

    mainDiv.addEventListener('change', (event) => {
      if (event.target.matches(persistedBothSelectors) && event.target.id) {
          myStorage[event.target.id] = event.target.type === 'checkbox' ? event.target.checked : event.target.value || '';
          localStorage.setItem(storageKey, JSON.stringify(myStorage));
      }
    }, false);

    mainDiv.addEventListener('click', (event) => {
      if (event.target.matches(clearButtonSelector) && event.target.value) {
        if (confirm("Are you sure to reset all the checkboxes in this page?")) {
          const checkboxPrefix = new RegExp(event.target.value);
          for (const key in myStorage) {  // needs delete each for not removing other pages' records.
            if (myStorage.hasOwnProperty(key) && key.match(checkboxPrefix)) {
              delete myStorage[key];
              const persistedCheckbox = document.querySelector(persistedCheckboxSelector+"#"+key);
              if (persistedCheckbox) {
                persistedCheckbox.checked = false;
              } else {  // text input
                document.querySelector(persistedTextSelector+"#"+key).value = '';
              }
            }
          }
          localStorage.setItem(storageKey, JSON.stringify(myStorage));
        }
      }
    }, false);
  }
});
