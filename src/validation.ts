import { extend } from "vee-validate";
import {
  required,
  min,
  max,
  min_value,
  max_value,
  numeric,
  regex
} from "vee-validate/dist/rules";
import { messages } from "vee-validate/dist/locale/en.json";
import regExp from "@/utilities/RegExp";
import { includesTwice } from "@/utilities/Array";

export function defineValidationRules() {
  extend("required", {
    ...required,
    message: alterMessage(messages.required)
  });
  extend("min", {
    ...min,
    message: alterMessage(messages.min)
  });
  extend("max", {
    ...max,
    message: alterMessage(messages.max)
  });
  extend("min_value", {
    ...min_value,
    message: alterMessage(messages.min_value)
  });
  extend("max_value", {
    ...max_value,
    message: alterMessage(messages.max_value)
  });
  extend("numeric", {
    ...numeric,
    message: alterMessage(messages.numeric)
  });
  extend("regex", {
    ...regex,
    message: "{_field_} contains invalid characters."
  });
  extend("option_selected", {
    validate: (value: undefined | null | number | string | object): boolean => {
      if (value === undefined || value === null) {
        return false;
      }
      if (typeof value === "number") {
        return true;
      }
      if (typeof value === "string") {
        // Reserve surrounding double underscores as action values (invalid for submission)
        return regExp.reservedSelectOption.test(value) === false;
      }
      if (typeof value === "object") {
        // Unknown object - assume the value is OK
        return true;
      }
      return false;
    },
    message: "{_field_} is required."
  });
  extend("no_dupes", {
    params: ["values"],
    validate: (value: undefined | null | number | string, {values}: Record<string, any>): boolean => {
      // Undefined and null are not supported
      if (value === undefined || value === null || !["number", "string"].includes(typeof value)) {
        throw new Error("\"no_dupes\" only supports number and string values.");
      }
      // Search for two hits - just one indicates the value identifying itself
      return !includesTwice(values, value);
    },
    message: "{_field_} cannot be duplicated."
  });
}

function alterMessage(message: string, locale: string = "en"): string {
  switch (locale) {
    case "en": // English
      // Before: "The {_field_} field is required"
      //  After: "{_field_} is required."
      return message.replace("The ", "").replace(" field", "") + ".";
    default:
      return message;
  }
}
