import { useMemo, useCallback } from 'react'
import { actions as staffActions, selectors as staffSelectors } from '../store/reducers/staff/index'

import { useDispatch, useSelector } from 'react-redux' 
import { bindActionCreators } from 'redux'

export const useStaffMembersActions = () => {
  const dispatch = useDispatch()

  const actions = useMemo(
    () => bindActionCreators(
      {
        getAllStaffMembers: staffActions.getAllStaffMembersRequest
      },
      dispatch
    ), [dispatch]
  )

  const getAllStaffMembers = useCallback((data) => {
    actions.getAllStaffMembers(data)
  }, [actions])

  return { getAllStaffMembers }
}

export const useStaffMembers = () => {

  const allStaffMembersLoading = useSelector((state: any) => staffSelectors.getAllStaffMembersLoading(state))
  const allStaffMembersLoaded = useSelector((state: any) => staffSelectors.getAllStaffMembersLoaded(state))
  const allStaffMembersError = useSelector((state: any) => staffSelectors.getAllStaffMembersError(state))
  const allStaffMembers = useSelector((state: any) => staffSelectors.getAllStaffMembers(state))

  return {
    allStaffMembersLoading,
    allStaffMembersLoaded,
    allStaffMembersError,
    allStaffMembers
  }
}
