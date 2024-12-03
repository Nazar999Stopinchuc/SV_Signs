
function drop(inputAt, inputLabelAt, fileNameAt) {
  const input = document.querySelector(inputAt);
  const inputLabel = document.querySelector(inputLabelAt);
  const fileName = document.querySelector(fileNameAt);

    function highlight(item) {
      item.style.border = "3px solid #FF7E14";
      item.style.backgroundColor = "#6B80BF";
    }

    function unhighlight(item) {
      item.style.border = "3px dashed #B8B8B8";
      item.style.backgroundColor = "#F2F2F2";
    }



    input.addEventListener('drop', (e) => {
      input.files = e.dataTransfer.files;
      fileName.textContent = input.files[0].name;
    });

    input.addEventListener('change', () => {
      if (input.files.length > 0) {
        fileName.textContent = input.files[0].name;
      } else {
        fileName.textContent = "File not selected";
      }
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      input.addEventListener(eventName, () => highlight(inputLabel));
    });

    ['dragleave', 'drop'].forEach(eventName => {
      input.addEventListener(eventName, () => unhighlight(inputLabel));
    });
  }


export default drop;