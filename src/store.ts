import Vue from "vue";
import Vuex from "vuex";
import { GetterTree, MutationTree, ActionTree } from "vuex";
import appModule from "@/app/vuex/module";

Vue.use(Vuex);

export class RootState {

}

const getters: GetterTree<RootState, any> = {

};

const mutations: MutationTree<RootState> = {

};

const actions: ActionTree<RootState, any> = {

};

export default new Vuex.Store({
  state: new RootState(),
  getters,
  mutations,
  actions,
  modules: {
    app: appModule
  }
});
