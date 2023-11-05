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

const findAndUpdateComponentStyles = (components, id, newStyles) => {
    for (const component of components) {
      if (component.id === id) {
        // Update styles if the current component is the one we're looking for
        component.styles = { ...component.styles, ...newStyles };
        return true;
      }
      // If not, and the component has children, recurse down
      if (component.children && findAndUpdateComponentStyles(component.children, id, newStyles)) {
        return true;
      }
    }
    return false; // Return false if the component wasn't found at this level
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
            const newId = `${selectedComponent.id} ${type} ${newIdSuffix}`; 
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
            state.error = null;
        }
        else {
            state.error = "Maximum nesting depth reached. Cannot add more components.";
        }
    },
    updateStyles(state, action) {
        const { id, styles } = action.payload;
        findAndUpdateComponentStyles(state.components, id, styles);
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

export const { updateStyles, selectComponent, addComponent, updateText } = componentSlice.actions;
// A selector for selected components
export const getSelectedComponent = (state) => {
    const searchComponent = (components, selectedId) => {
      for (const component of components) {
        if (component.id === selectedId) {
          return component;
        }
        if (component.children) {
          const found = searchComponent(component.children, selectedId);
          if (found) return found;
        }
      }
      return null;
    };
  
    return searchComponent(state.components.components, state.components.selectedComponentId);
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
  
  

export const store = configureStore({
  reducer: {
    components: componentSlice.reducer,
  },
});
