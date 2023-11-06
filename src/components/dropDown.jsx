import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectComponent, getSelectedComponent } from "../redux/store";
import {
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@mui/material";

const Dropdown = () => {
    const selectedComponent = useSelector(getSelectedComponent);
    const [dropdownValue, setDropdownValue] = useState(selectedComponent.id);
    const dispatch = useDispatch();
    const components = useSelector(state => state.components.components);

    const handleDropdownChange = (event) => {
        const value = event.target.value;
        setDropdownValue(value);
        dispatch(selectComponent(value));
    };

    const createOptions = (components) => {
        let options = [];
        components.forEach(comp => {
          options.push({ value: `${comp.id}`, label: `${comp.id}` });
          if (comp.children && comp.children.length > 0) {
            options = options.concat(createOptions(comp.children, `${comp.id}`));
          }
        });
        return options;
      };
    
      const options = createOptions(components);

    return (
        <Box sx={{ position: "absolute", top: 20, right: 10 }}>
            <FormControl sx={{ minWidth: "100px", maxWidth: "300px" }}>
                <InputLabel sx={{ fontSize: "12px" }} id="dropdown-label">Options</InputLabel>
                <Select
                    labelId="dropdown-label"
                    id="dropdown"
                    value={dropdownValue}
                    label="Options"
                    onChange={handleDropdownChange}
                    sx={{ fontSize: "12px" }}
                >
                {options?.map((option) => (
                    <MenuItem key={option.value} value={option.value} sx={{fontSize: "10px"}}>
                    {option.label}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default Dropdown;
