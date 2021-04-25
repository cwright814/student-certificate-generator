import Vue from "vue";
import Router, { Route } from "vue-router";
import { Position } from "vue-router/types/router";
import Generator from "./app/views/Generator.vue";
import Instructions from "./app/views/Instructions.vue";
import InstructionsIndex from "./app/views/instructions/Index.vue";
import InstructionsText from "./app/views/instructions/Text.vue";
import InstructionsVideo from "./app/views/instructions/Video.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "generator",
      component: Generator,
      meta: {scrollToTop: true}
    },
    {
      path: "/instructions",
      component: Instructions,
      children: [
        {
          path: "",
          name: "instructions",
          component: InstructionsIndex
        },
        {
          path: "text",
          name: "instructions-text",
          component: InstructionsText
        },
        {
          path: "video",
          name: "instructions-video",
          component: InstructionsVideo
        }
      ]
    }
  ],
  scrollBehavior(to: Route, from: Route, savedPosition: void | Position) {
    // Popstate navigations (forward and back buttons in browser)
    if (savedPosition) {
      return savedPosition;
    }

    // Linking a page anchor (scroll to element with matching id)
    if (to.hash) {
      return {selector: to.hash};
    }

    // Force scroll to top if defined by route meta
    if (to.matched.some((m) => m.meta.scrollToTop)) {
      return {x: 0, y: 0} as Position;
    }

    // Retain current scroll position
    return null;
  }
});
