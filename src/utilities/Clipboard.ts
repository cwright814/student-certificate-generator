// @NOTE Unused in the public demo

// https://github.com/euvl/v-clipboard/issues/18#issuecomment-733642508
export default function clipboard(text: string): void {
  const textarea = document.createElement("textarea");
  textarea.addEventListener("focusin", (event) => event.stopPropagation());
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}
