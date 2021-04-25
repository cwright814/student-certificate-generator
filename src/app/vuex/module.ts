// Check the vuex guide for how to access the root state from this module:
// https://vuex.vuejs.org/guide/modules.html#accessing-global-assets-in-namespaced-modules

// To contain this module within its own scope, set 'namespaced' to true, then use as follows:
//    State: $store.state.mymodule.{...}
//   Getter: $store.getters["mymodule/{...}"]
// Mutation: $store.commit("mymodule/{...}", payload)
//   Action: $store.dispatch("mymodule/{...}", payload)

import { GetterTree, MutationTree, ActionTree, Module } from "vuex";
import { RootState } from "@/store";
import IClass from "../interfaces/Class";
import ICertificateForm from "../interfaces/CertificateForm";

export class AppState {
  public appFirstLoad: boolean = true;
  public submitAttempted: boolean = false;
  public defaultClass!: IClass;
  public defaultForm!: ICertificateForm;
  public form!: ICertificateForm;
}

const getters: GetterTree<AppState, RootState> = {
  appFirstLoad: (state) => {
    return state.appFirstLoad;
  },
  submitAttempted: (state) => {
    return state.submitAttempted;
  },
  defaultClass: (state) => {
    return state.defaultClass;
  },
  defaultForm: (state) => {
    return state.defaultForm;
  },
  form: (state) => {
    return state.form;
  }
};

const mutations: MutationTree<AppState> = {
  appHasLoaded: (state) => {
    state.appFirstLoad = false;
  },
  formAttemptedSubmit: (state) => {
    state.submitAttempted = true;
  },
  formStateWasReset: (state) => {
    state.submitAttempted = false;
  },
  defaultClass: (state, payload: IClass) => {
    state.defaultClass = payload;
  },
  defaultForm: (state, payload: ICertificateForm) => {
    state.defaultForm = payload;
  },
  form: (state, payload: ICertificateForm) => {
    state.form = payload;
  }
};

const actions: ActionTree<AppState, RootState> = {

};

const appModule: Module<AppState, RootState> = {
  namespaced: false,
  state: new AppState(),
  getters,
  mutations,
  actions
};

export default appModule;
