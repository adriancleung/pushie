import React, {createContext, useContext, useEffect, useReducer} from 'react';
import {User} from '../types/user';
import {getData, storeData} from '../util';

type Action =
  | {type: 'DISMISS_ONBOARDING'}
  | {type: 'LOADING'}
  | {type: 'LOADING_FINISHED'}
  | {type: 'LOGOUT'}
  | {type: 'NO_CONNECTION'}
  | {type: 'RETRY_CONNECTION'}
  | {type: 'SHOW_ONBOARDING'}
  | {type: 'UPDATE_ACCESS_TOKEN'; value: string}
  | {type: 'UPDATE'; value: User};

type Dispatch = (action: Action) => void;
type State = User;
type UserProviderProps = {children: React.ReactChild};

const CONTEXT_DEFAULT_STATE: User = {
  userId: '',
  email: '',
  accessToken: '',
  role: '',
  connection: true,
  loading: false,
  onboarding: true,
};

const UserContext = createContext<{state: State; dispatch: Dispatch}>({
  state: CONTEXT_DEFAULT_STATE,
  dispatch: () => {},
});

const userReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'DISMISS_ONBOARDING':
      return {
        ...state,
        onboarding: false,
      };
    case 'LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'LOADING_FINISHED':
      return {
        ...state,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...CONTEXT_DEFAULT_STATE,
        onboarding: false,
      };
    case 'NO_CONNECTION':
      return {
        ...state,
        connection: false,
      };
    case 'RETRY_CONNECTION':
      return {
        ...state,
        connection: true,
      };
    case 'SHOW_ONBOARDING':
      return {
        ...state,
        onboarding: true,
      };
    case 'UPDATE_ACCESS_TOKEN':
      return {
        ...state,
        accessToken: action.value,
      };
    case 'UPDATE':
      return {
        ...state,
        ...action.value,
      };
  }
};

const UserProvider: React.FC<UserProviderProps> = ({children}) => {
  const [state, dispatch] = useReducer(userReducer, CONTEXT_DEFAULT_STATE);
  const value = {state, dispatch};

  useEffect(() => {
    dispatch({type: 'LOADING'});
    getData('context').then((user) => {
      dispatch({type: 'UPDATE', value: user});
      dispatch({type: 'RETRY_CONNECTION'});
      dispatch({type: 'LOADING_FINISHED'});
    });
  }, []);

  useEffect(() => {
    storeData('context', state);
  }, [state]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUser = () => useContext(UserContext);

export {UserProvider, useUser};
