import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AdminUserState } from "./admin.store.state";

export const selectAdminUserState = createFeatureSelector<AdminUserState>('adminUser')

export const selectAdminUser = createSelector(selectAdminUserState,(state)=>state.users)
export const selectAdminUserLoading = createSelector(selectAdminUserState,(state)=>state.loading)
