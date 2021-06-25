import { createSelector } from 'reselect'

export const getAllClientsLoading = createSelector([
  (state: any) => state?.getAllClientsService?.getAllClients?.loadingGetAllClients,
],
  (loading: Boolean) => loading
)

export const getAllClientsLoaded = createSelector([
  (state: any) => state?.getAllClientsService?.getAllClients?.loadedGetAllClients,
],
  (loaded: Boolean) => loaded
)

export const getAllClientsError = createSelector([
  (state: any) => state?.getAllClientsService?.getAllClients?.errorGetAllClients,
],
  (error: any) => error
)

export const getAllClients = createSelector([
  (state: any) => state?.getAllClientsService?.getAllClients?.allClients
], 
  (clients) => clients
)