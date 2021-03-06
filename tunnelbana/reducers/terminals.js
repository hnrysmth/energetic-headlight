import Immutable from "immutable";
import { createReducer } from "signalbox";
import actions from "../actions";

export const reducer = createReducer(new Immutable.Map(), {
  [actions.CREATE_TERMINAL](state, action) {
    return state.set(
      action.terminal.id,
      Immutable.fromJS({
        id: action.terminal.id,
        connectionId: action.terminal.connectionId,
        lineId: action.terminal.lineId,
        stationId: action.terminal.stationId,
        isSelected: false
      })
    );
  },

  [actions.CREATE_CONNECTION](state, action) {
    const { lineId, sourceId, destinationId } = action.connection;
    const newSource = selectors.byLineAndStation(state, lineId, sourceId);
    const newDestination = selectors.byLineAndStation(
      state,
      lineId,
      destinationId
    );

    if (newSource && !newDestination) {
      return state.setIn(
        [newSource.id, "stationId"],
        action.connection.destinationId
      );
    }

    return state;
  },

  [actions.GRAB_TERMINAL](state, action) {
    const terminalId = action.terminalId;
    return state.setIn([terminalId, "isSelected"], true);
  },

  [actions.DROP_TERMINAL](state, action) {
    return state.update(action.terminalId, terminal => {
      return terminal.merge(
        Immutable.fromJS({
          isSelected: false,
          x: undefined,
          y: undefined
        })
      );
    });
  },

  [actions.DRAGON_MOVE](state, action) {
    if (action.dragon.entity !== "terminal") return state;
    return state.update(action.dragon.id, terminal => {
      return terminal.merge(
        Immutable.fromJS({
          x: action.dragon.x,
          y: action.dragon.y
        })
      );
    });
  },

  [actions.DRAGON_DROP](state, action) {
    if (action.dragon.entity !== "terminal") return state;
    return state.update(action.dragon.id, terminal => {
      return terminal.merge(
        Immutable.fromJS({
          isSelected: false
        })
      );
    });
  },

  [actions.DELETE_TERMINAL](state, action) {
    return state.delete(action.terminal.id);
  },

  [actions.UPDATE_TERMINAL](state, action) {
    return state.update(action.terminal.id, terminal => {
      return terminal.merge(Immutable.fromJS(action.terminal));
    });
  },

  [actions.IMAGINE_CONNECTION](state, action) {
    return state.merge({
      [action.sourceTerminal.id]: action.sourceTerminal,
      [action.destinationTerminal.id]: action.destinationTerminal
    });
  }
});

export const selectors = {
  all(state) {
    return state.toList();
  },

  byId(state, id) {
    return state.get(id);
  },

  byLineAndStation(state, lineId, destinationId) {
    return state
      .filter(t => {
        return (
          t.get("lineId") === lineId && t.get("stationId") === destinationId
        );
      })
      .first();
  }
};
