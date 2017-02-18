import { LOGIN, LOGIN_FAILED, API_VERSION } from './constants'
import { normalize } from 'normalizr'
import { fromJS } from 'immutable'

import authUserSchema from './authUserSchema'


export const login = ({ username, password, server }) => {
  return (dispatch) => fetch(`${server}/${API_VERSION}/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username, password }),
  }).then(
    response => response.json()
  ).then(
    json => {
      if (json.status_code) {
        return dispatch({ type: LOGIN_FAILED, json })
      }

      return dispatch({
        type: LOGIN,
        payload: fromJS(normalize(json, authUserSchema))
      })
    },
    err => dispatch({ type: LOGIN_FAILED, err })
  );
}
