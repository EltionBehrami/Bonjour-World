export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const openModal = (content) => ({
  type: OPEN_MODAL,
  payload: content,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});

const initialState = {
  isOpen: false,
  content: null,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        isOpen: true,
        content: action.payload,
      };
    case 'CLOSE_MODAL':
      return {
        isOpen: false,
        content: null,
      };
    default:
      return state;
  }
};

export default modalReducer;