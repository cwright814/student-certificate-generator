import regExp from "@/utilities/RegExp";

// For use with general inputs
export function getValidationState(
  {valid}: {valid: boolean}, submitAttempted: boolean
): boolean | null {
  // Must have attempted submission before checking validation
  return submitAttempted ? valid : null;
}

// Intended for use with the custom vee-validation rule: option_selected
export function getValidationStateForSelect(
  {valid}: {valid: boolean}, submitAttempted: boolean, value?: any
): boolean | null {
  // Ignore if reserved, else standard rules apply
  return regExp.reservedSelectOption.test(value) ? null : getValidationState({valid}, submitAttempted);
}
