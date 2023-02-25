import types from "./types"

const initialState = {
  requesting: false,
  PrivacyPolicy: false,
  UserPrivacyPolicyid: false
}

export default (state = initialState, action) => {
  // debugger
  switch (action.type) {
    case types.getPrivacyPolicy:
      return { ...state, requesting: true }

    case types.getPrivacyPolicySuccess:
      return { ...state, requesting: false, PrivacyPolicy: action.data }

    case types.getPrivacyPolicyFailure:
      return {
        ...state,
        requesting: false
      }

    case types.getUserPrivacyPolicyid:
      return { ...state, requesting: true }

    case types.getUserPrivacyPolicyidSuccess:
      return { ...state, requesting: false, UserPrivacyPolicyid: action.data }

    case types.getUserPrivacyPolicyidFailure:
      return {
        ...state,
        requesting: false
      }

    default:
      return state
  }
}
