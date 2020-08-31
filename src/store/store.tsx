import React, { createContext, useReducer, useEffect } from 'react';

const initialChannel = localStorage.getItem('selected_channel')
  ? JSON.parse(localStorage.getItem('selected_channel')!)
  : { id: '', name: 'general' };

const initialStoreValue = {
  selectedChannel: initialChannel,
  user: localStorage.getItem('current_user') || '',
};

export enum Actions {
  'SELECTED_CHANNEL',
  'USER',
}

export const StoreContext = createContext<Context>({
  ...initialStoreValue,
  dispatch: () => '',
});

type SelectedChannelAction = {
  type: Actions.SELECTED_CHANNEL;
  payload: { id: string; name: string; members: number };
};

type UserAction = {
  type: Actions.USER;
  payload: string;
};

type Action = SelectedChannelAction | UserAction;
interface State {
  selectedChannel: { id: string; name: string; members: number } | null;
  user: string;
}

export interface Context extends State {
  dispatch: (action: Action, payload?: any) => void;
}

const storeReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case Actions.SELECTED_CHANNEL:
      return { ...state, selectedChannel: action.payload };

    case Actions.USER:
      return { ...state, user: action.payload };

    default:
      throw new Error();
  }
};

interface Props {
  children: React.ReactNode;
}

export const StoreContextProvider = (props: Props) => {
  const [store, dispatch] = useReducer(storeReducer, initialStoreValue);

  useEffect(() => {
    localStorage.setItem(
      'selected_channel',
      JSON.stringify(store.selectedChannel)
    );
  }, [store.selectedChannel]);

  useEffect(() => {
    if (!store.user) {
      const value = prompt('Select a user');
      if (value) {
        dispatch({ type: Actions.USER, payload: value });
        localStorage.setItem('current_user', value);
      }
    }
  }, [store.user]);

  return (
    <StoreContext.Provider value={{ ...store, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
};
