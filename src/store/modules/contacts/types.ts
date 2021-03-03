import type { ActionType } from 'typesafe-actions';
import type * as actions from './actions';

export type ContactsAction = ActionType<typeof actions>;

export interface ContactsState {
  readonly loading: boolean;
  readonly contacts: [];
  readonly locale: {};
}
