import type { ActionType } from 'typesafe-actions';
import type * as actions from './actions';

export type CommonsAction = ActionType<typeof actions>;

export interface CommonsState {
  readonly availableButtons: boolean;
  // readonly modalNetwork: boolean;
  // readonly versionAndroid: number;
  // readonly versionIos: number;
  // readonly versions: [];
  // readonly chats: [];
  // readonly uIds: [];
  // readonly networkStatus: any;
}
