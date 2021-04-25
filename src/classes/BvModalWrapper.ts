import Vue from "vue";
import IBvModalWrapper, { MsgBoxOptions } from "../interfaces/BvModalWrapper";

export default class BvModalWrapper implements IBvModalWrapper {
  protected vue: Vue;
  protected defaults: MsgBoxOptions;

  public constructor(vue: Vue, defaults: MsgBoxOptions = {}) {
    this.vue = vue;
    this.defaults = defaults;
  }

  public async msgBoxConfirm(message: string, options: MsgBoxOptions = {}) {
    return await this.vue.$bvModal.msgBoxConfirm(message, {
      ...this.defaults,
      ...options
    });
  }

  public async msgBoxOk(message: string, options: MsgBoxOptions = {}) {
    return await this.vue.$bvModal.msgBoxOk(message, {
      ...this.defaults,
      ...options
    });
  }

  public async msgBoxError(message: string, options: MsgBoxOptions = {}) {
    return await this.msgBoxOk(message, {
      ...this.defaults,
      ...{title: "❌ Error"},
      ...options
    });
  }

  public msgBoxFallback(error?: Error, message: string =
    "An unexpected error has occurred. Please check your internet connection and refresh your browser."
  ) {
    // @DEBUG Log error stack trace
    if (error && process.env.NODE_ENV === "development") {
      console.log(error.stack);
    }

    alert(message);
  }

  public get msgBoxDefaults() {
    return this.defaults;
  }
}
