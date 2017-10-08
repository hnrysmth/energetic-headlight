import { TweenMax } from "gsap";
import { createMiddleware } from "signalbox";
import actions from "../actions";
import clock from "../clock";

export const middleware = createMiddleware((before, after) => ({
  [after(actions.PAUSE)](store) {
    clock.pause();
    TweenMax.pauseAll(true, true);
  },

  [after(actions.RESUME)](store) {
    clock.resume();
    TweenMax.resumeAll(true, true);
  },

  [after(actions.BLUR_WINDOW)](store) {
    store.dispatch(actions.pause());
  },

  [after(actions.FOCUS_WINDOW)](store) {
    store.dispatch(actions.resume());
  }
}));