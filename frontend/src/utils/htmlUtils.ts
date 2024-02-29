export function stripHtmlTags(htmlString: string) {
  const temporaryElement = document.createElement("div");
  temporaryElement.innerHTML = htmlString;
  return temporaryElement.textContent || temporaryElement.innerText || "";
}
