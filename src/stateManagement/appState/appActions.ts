import { createAction, ActionsUnion } from "../utils";

export enum AppActionTypes {
  toggleDrawer = "TOGGLE_DRAWER",
  ToggleControlPanel = "TOGGLE_CONTROL_PANEL",
  resize = "RESIZE"
}

export const Actions = {
  ToggleDrawer: () => createAction(AppActionTypes.toggleDrawer),
  ToggleControlPanel: () => createAction(AppActionTypes.toggleDrawer),
  Resize: (width: number, height: number) =>
    createAction(AppActionTypes.resize, { width, height })
};

export type AppActions = ActionsUnion<typeof Actions>;
