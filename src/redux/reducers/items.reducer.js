const itemsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ITEMS':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default itemsReducer;


  //! Comments:
  // if the type is 'SET_ITEMS' the function replaces the existing state 
  // with the payload attribute of the action object
  // If the type does not match any cases, the function returns the current state