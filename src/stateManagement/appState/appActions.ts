import { createAction, ActionsUnion } from '../utils';

export enum AppActionTypes {
  toggleDrawer = 'TOGGLE_DRAWER',
  ToggleControlPanel = 'TOGGLE_CONTROL_PANEL'
}

export const Actions = {
  ToggleDrawer: () => createAction(AppActionTypes.toggleDrawer),
  ToggleControlPanel: () => createAction(AppActionTypes.toggleDrawer)
};

export type AppActions = ActionsUnion<typeof Actions>;
