// @NOTE Unused in the public demo

import Vue from "vue";
import app from "@/main";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import config from "@/config.json";

export default class Slack {
  public readonly webhookURL: string;
  protected vue: Vue;

  public constructor(params: {vue?: Vue, webhookURL?: string} = {}) {
    const options = {...config.default.slack, ...params};

    if (!options.webhookURL) {
      throw new Error("Webhook URL must be defined.");
    }

    this.webhookURL = options.webhookURL;
    this.vue = options.vue || app;
  }

  public async sendMessage(content: object | string | number | null): Promise<AxiosResponse<any>> {
    this.initVue();

    let data;
    if (content === null || ["string", "number"].includes(typeof content)) {
      data = {text: content};
    } else {
      data = content;
    }

    return await this.vue.$http.post(this.webhookURL, data, this.options);
  }

  protected get options(): AxiosRequestConfig {
    return {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
  }

  protected initVue(): void {
    if (!this.vue) {
      if (!app) {
        throw new Error("Missing reference to Vue instance (required for HTTP requests).");
      }
      this.vue = app;
    }
  }
}
