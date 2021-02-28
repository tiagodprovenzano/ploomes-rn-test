import produce, { Draft } from 'immer';

import type { CommonsAction, CommonsState } from './types';

const INITIAL_STATE: CommonsState = {
  availableButtons: true,
};

export default function commons(state = INITIAL_STATE, action: CommonsAction) {
  return produce(state, (draft: Draft<CommonsState>) => {
    switch (action.type) {
      case '@commons/AVAILABLE_BUTTONS': {
        draft.availableButtons = action.payload.status;
        break;
      }
      default:
    }
  });
}

