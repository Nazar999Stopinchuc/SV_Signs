
function initializeDropHandlers(containerSelector) {
  const container = document.querySelector(containerSelector);

  function highlight(item) {
    item.style.border = "3px solid #FF7E14";
    item.style.backgroundColor = "#6B80BF";
  }

  function unhighlight(item) {
    item.style.border = "3px dashed #B8B8B8";
    item.style.backgroundColor = "#F2F2F2";
  }

  container.addEventListener('dragenter', (e) => {
    const inputLabel = e.target.closest('[data-drop-label]');
    if (inputLabel) highlight(inputLabel);
  });

  container.addEventListener('dragover', (e) => {
    e.preventDefault(); 
  });

  container.addEventListener('dragleave', (e) => {
    const inputLabel = e.target.closest('[data-drop-label]');
    if (inputLabel) unhighlight(inputLabel);
  });

  container.addEventListener('drop', (e) => {
    e.preventDefault(); 
    const input = e.target.closest('[data-drop-input]');
    const inputLabel = e.target.closest('[data-drop-label]');
    const fileName = inputLabel ? inputLabel.querySelector('[data-file-name]') : null;

    if (input && fileName) {
      input.files = e.dataTransfer.files;
      fileName.textContent = input.files[0] ? input.files[0].name : "File not selected";
      unhighlight(inputLabel);
    }
  });

  container.addEventListener('change', (e) => {
    const input = e.target.closest('[data-drop-input]');
    if (input) {
      const inputLabel = input.closest('[data-drop-label]');
      const fileName = inputLabel ? inputLabel.querySelector('[data-file-name]') : null;
      if (fileName) {
        fileName.textContent = input.files[0] ? input.files[0].name : "File not selected";
      }
    }
  });
}


export default initializeDropHandlers;