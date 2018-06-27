import { createAction, ActionsUnion } from "../utils";

export enum AppActionTypes {
  toggleDrawer = "TOGGLE_DRAWER"
}

export const Actions = {
  ToggleDrawer: () => createAction(AppActionTypes.toggleDrawer)
};

export type AppActions = ActionsUnion<typeof Actions>;
