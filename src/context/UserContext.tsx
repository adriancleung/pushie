import React, {createContext, useContext, useEffect, useReducer} from 'react';
import {User} from '../types/user';
import {getData, storeData} from '../util';

type Action =
  | {type: 'UPDATE_ACCESS_TOKEN'; value: string}
  | {type: 'UPDATE'; value: User}
  | {type: 'LOGOUT'};
type Dispatch = (action: Action) => void;
type State = User;
type UserProviderProps = {children: React.ReactChild};

const CONTEXT_DEFAULT_STATE: User = {
  userId: '',
  email: '',
  accessToken: '',
  role: '',
};

const UserContext = createContext<{state: State; dispatch: Dispatch}>({
  state: CONTEXT_DEFAULT_STATE,
  dispatch: () => {},
});

const userReducer = (state: State, action: Action) => {
  switch (action.type) {
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
    case 'LOGOUT':
      return CONTEXT_DEFAULT_STATE;
  }
};

const UserProvider: React.FC<UserProviderProps> = ({children}) => {
  const [state, dispatch] = useReducer(userReducer, CONTEXT_DEFAULT_STATE);
  const value = {state, dispatch};

  useEffect(() => {
    getData('context').then((user) => dispatch({type: 'UPDATE', value: user}));
  }, []);

  useEffect(() => {
    storeData('context', state);
  }, [state]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUser = () => useContext(UserContext);

export {UserProvider, useUser};
