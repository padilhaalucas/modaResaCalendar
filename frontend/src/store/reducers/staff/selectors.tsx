import { createSelector } from 'reselect'

export const getAllStaffMembersLoading = createSelector([
  (state: any) => state?.getAllStaffMembersService?.getAllStaffMembers?.loadingGetAllStaffMembers,
],
  (loading: Boolean) => loading
)

export const getAllStaffMembersLoaded = createSelector([
  (state: any) => state?.getAllStaffMembersService?.getAllStaffMembers?.loadedGetAllStaffMembers,
],
  (loaded: Boolean) => loaded
)

export const getAllStaffMembersError = createSelector([
  (state: any) => state?.getAllStaffMembersService?.getAllStaffMembers?.errorGetAllStaffMembers,
],
  (error: any) => error
)

export const getAllStaffMembers = createSelector([
  (state: any) => state?.getAllStaffMembersService?.getAllStaffMembers?.allStaffMembers
], 
  (staffMembers) => staffMembers
)