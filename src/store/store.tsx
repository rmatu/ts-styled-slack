import React, { createContext, useReducer } from 'react';

const initialStoreValue = {
  selectedChannel: '',
};

export enum Actions {
  'SELECTED_CHANNEL',
}

export const StoreContext = createContext<Context>({
  ...initialStoreValue,
  dispatch: () => '',
});

type Action = { type: Actions.SELECTED_CHANNEL; payload: string };

interface State {
  selectedChannel: string;
}

interface Context extends State {
  dispatch: (action: Action, payload?: any) => void;
}

const storeReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case Actions.SELECTED_CHANNEL:
      return { selectedChannel: action.payload };

    default:
      throw new Error();
  }
};

interface Props {
  children: React.ReactNode;
}

export const StoreContextProvider = (props: Props) => {
  const [store, dispatch] = useReducer(storeReducer, initialStoreValue);

  return (
    <StoreContext.Provider value={{ ...store, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
};
