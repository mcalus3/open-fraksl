import { createAction, ActionsUnion } from "../utils";

export enum AppActionTypes {
  toggleDrawer = "TOGGLE_DRAWER",
  resize = "RESIZE"
}

export const Actions = {
  ToggleDrawer: () => createAction(AppActionTypes.toggleDrawer),
  Resize: (width: number, height: number) =>
    createAction(AppActionTypes.resize, { width, height })
};

export type AppActions = ActionsUnion<typeof Actions>;
