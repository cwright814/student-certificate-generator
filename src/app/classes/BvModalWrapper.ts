import BvModalWrapper from "@/classes/BvModalWrapper";
import { MsgBoxOptions } from "@/interfaces/BvModalWrapper";

export const msgBoxDefaults: MsgBoxOptions = {
  title: String.fromCharCode(8205),
  size: "sm",
  footerClass: "p-2",
  headerBgVariant: "dark",
  headerTextVariant: "light",
  hideHeaderClose: false,
  centered: true
};

export default class extends BvModalWrapper {
  public constructor(vue: Vue) {
    super(vue, msgBoxDefaults);
  }
}
