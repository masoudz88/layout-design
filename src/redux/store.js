import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialComponentState = {
  components: [
    {
        id: "section 1",
        type: "section",
        text: "",
        styles: {
            width: "500px",
            height: "500px",
            display: "block",
            position: "static",
            color: "#000000",
            backgroundColor: "#aca7a7",
            paddingTop: "0",
            paddingRight: "0",
            paddingBottom: "0",
            paddingLeft: "0",
            margin: "0",
            borderRadius: "10px"
        },
        children: [],
        nestingDepth: 0
    },
],
  selectedComponentId: "section 1",
  error: null,
};

const findComponent = (components, id) => {
    for (const component of components) {
      if (component.id === id) {
        return component;
      }
      if (component.children.length > 0) {
        const foundComponent = findComponent(component.children, id);
        if (foundComponent) return foundComponent;
      }
    }
    return null;
};

const getRandomColor = () => {
    // Generate a random hex color
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
};
  
const componentSlice = createSlice({
  name: "components",
  initialState: initialComponentState,
  reducers: {
    addComponent(state, action) {
        const { type } = action.payload;
        const selectedComponent = findComponent(state.components, state.selectedComponentId);

        if (selectedComponent && selectedComponent.nestingDepth < 4) {
            // Get the next ID based on the children of the selected component
            const childrenOfType = selectedComponent.children.filter(child => child.type === type).length;
            
            // Create a new ID based on the parent ID and the number of same-type children
            const newIdSuffix = childrenOfType + 1;
            const newId = `${selectedComponent.id} -> ${type} ${newIdSuffix}`; 
            const newComponent = {
                id: newId,
                type: type,
                text: type === "section" ? "" : newId,
                styles: {
                    width: type === "section" ? "80px" : "max-content",
                    height: type === "section" ? "80px" : "30px",
                    display: "block",
                    position: "static",
                    color: "#000000",
                    backgroundColor: getRandomColor(),
                    paddingTop: "0",
                    paddingRight: "0",
                    paddingBottom: "0",
                    paddingLeft: "0",
                    margin: "0",
                    borderRadius: "10px"
                },
                children: [],
                nestingDepth: selectedComponent.nestingDepth + 1,
            };
            selectedComponent.children.push(newComponent);
        }
        else {
            state.error = "Maximum nesting depth reached!";
        }
    },
    updateStyles(state, action) {
        const { id, styles } = action.payload;
        const component = findComponent(state.components, id);
        if (component) {
            component.styles = { ...component.styles, ...styles };
        }
      },
    selectComponent(state, action) {
        state.selectedComponentId = action.payload;
    },
    updateText(state, action) {
        const { id, text } = action.payload;
        const component = findComponent(state.components, id);
        if (component) {
          component.text = text;
        }
    },
  },
});

export const getComponentError = (state) => state.components.error;

export const getSelectedComponent = (state) => {
    return findComponent(state.components.components, state.components.selectedComponentId);
};

export const { updateStyles, selectComponent, addComponent, updateText } = componentSlice.actions;

export const store = configureStore({
  reducer: {
    components: componentSlice.reducer,
  },
});
