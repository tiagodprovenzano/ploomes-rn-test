import { action } from 'typesafe-actions';

export function availableButtons(status: boolean) {
  return action('@commons/AVAILABLE_BUTTONS', { status });
}
