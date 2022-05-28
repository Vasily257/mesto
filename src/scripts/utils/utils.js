// Function to change the submit button text when to request to the server

export function getSubmitInitialText(popup) {
  const initialText = popup.getSubmitButton().textContent;
  return initialText;
}

export function changeSubmitText(startDownload, popup, initialText, uploadText) {
  const submitButton = popup.getSubmitButton();

  if (startDownload) {
    submitButton.textContent = uploadText;
  } else {
    submitButton.textContent = initialText;
  }
}
