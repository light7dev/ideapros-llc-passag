import types from "./types"

export const getPrivacyPolicy = () => ({
  type: types.getPrivacyPolicy
})

export const getPrivacyPolicyFailure = () => ({
  type: types.getPrivacyPolicyFailure
})

export const getPrivacyPolicySuccess = data => ({
  type: types.getPrivacyPolicySuccess,
  data
})
export const geUsertPrivacyPolicyid = () => ({
  type: types.getUserPrivacyPolicyid
})

export const getUserPrivacyPolicyidFailure = () => ({
  type: types.getUserPrivacyPolicyidFailure
})

export const getUserPrivacyPolicyidSuccess = data => ({
  type: types.getUserPrivacyPolicyidSuccess,
  data
})
