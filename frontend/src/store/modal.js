export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const openModal = (modal) => ({
  type: OPEN_MODAL,
  modal,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});

const modalReducer = (state = {}, action) => {
  const newState = {...state}

  switch (action.type) {
    case 'OPEN_MODAL':
      newState["modal"] = action.modal; 
      return newState;
    case 'CLOSE_MODAL':
      newState["modal"] = null;
      return newState; 
    default:
      return state;
  }
};

export default modalReducer;