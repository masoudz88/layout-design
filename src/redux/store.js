// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialComponentState = {
  components: [{
    id: 1,
    type: 'section',
    styles: {
      width: '100px',
      height: '100px',
      display: 'block',
      position: 'static',
      color: '#000000',
      backgroundColor: '#dd6969',
      padding: '0',
      margin: '0'
    },
    children: []
  }],
  selectedComponentId: 1,
  nestingDepth: 0
};

const componentSlice = createSlice({
  name: 'components',
  initialState: initialComponentState,
  reducers: {
    updateStyles(state, action) {
      const { id, styles } = action.payload;
      console.log(id, styles)
      const component = state.components.find(comp => comp.id === id);
      if (component) {
        component.styles = { ...component.styles, ...styles };
      }
    },
    // Add more reducers for adding, nesting components etc.
  },
});

export const { updateStyles } = componentSlice.actions;

export const store = configureStore({
  reducer: {
    components: componentSlice.reducer,
  },
});
