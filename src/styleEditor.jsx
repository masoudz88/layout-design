import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStyles, getSelectedComponent, addComponent, updateText, getComponentError } from "../src/redux/store";
import { Container, Button, TextField } from "@mui/material";

const StyleEditor = () => {
    const [isEditingText, setIsEditingText] = useState(false);
    const [editText, setEditText] = useState("");
    const dispatch = useDispatch();
    const selectedComponent = useSelector(getSelectedComponent);
    const error = useSelector(getComponentError);

    const positionOptions = [
        { value: "static", label: "Static" },
        { value: "relative", label: "Relative" },
        { value: "absolute", label: "Absolute" },
        { value: "fixed", label: "Fixed" },
        { value: "sticky", label: "Sticky" }
    ];

    const displayOptions = [
        { value: "block", label: "Block" },
        { value: "inline", label: "Inline" },
        { value: "inline-block", label: "Inline-Block" },
        { value: "flex", label: "Flex" },
        { value: "grid", label: "Grid" },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        const noPxNeeded = ["color", "backgroundColor", "position", "display"];
        if (selectedComponent) {
        const styleValue = noPxNeeded.includes(name) ? value : `${value}px`;
        dispatch(updateStyles({ id: selectedComponent.id, styles: { [name]: styleValue } }));
        }
    };  

    const handleAddSection = () => {
        if (selectedComponent) {
        dispatch(addComponent({ type: "section" }));
        }
    };

    const handleAddButton = () => {
        if (selectedComponent) {
        dispatch(addComponent({ type: "button" }));
        }
    };

    const handleEditTextChange = (event) => {
        setEditText(event.target.value);
    };

    const handleUpdateText = () => {
        if (selectedComponent) {
            dispatch(updateText({ id: selectedComponent.id, text: editText }));
            setIsEditingText(false);
        }
    };

    const handleEditButtonClick = () => {
        setEditText(selectedComponent.text);
        setIsEditingText(true);
    };

    return (
        <Container sx={{position: "relative", paddingTop: "50px"}}>
            {error && <p className="error">{error}</p>}
            <div className="selector-text"><strong>{selectedComponent?.id}</strong> is selected</div>
            
            { isEditingText ?
                <div className="edit-text">
                    <TextField id="standard-basic" label="Text" variant="standard" onChange={handleEditTextChange}/>
                    <Button variant="contained" color="primary" onClick={handleUpdateText} sx={{marginLeft: "10px", padding: "10px"}}>
                        Update Text
                    </Button>
                </div>
                :
                <div className="buttons-style">
                    {selectedComponent.type === "section" ?
                        <div className="buttons-style">
                        <Button sx={{ marginRight: "10px" }} variant="contained" color="success" onClick={handleAddSection}>
                            Add a Section
                        </Button>
                        <Button variant="contained" onClick={handleAddButton}>
                            Add a Button
                        </Button>
                    </div>
                    :
                    <Button variant="contained" color="success" onClick={handleEditButtonClick}>
                      Edit Button Text
                    </Button>
                  }
                </div>
            }
            <div className="styling-elements">
                <div className="layout-style">
                    <div style={{width: "50px"}}>Width:</div>
                    <input className="input-style" name="width" onChange={handleChange} />
                    <label>px</label>
                </div>

                <div className="layout-style">
                    <div style={{width: "50px"}}>Height:</div>
                    <input className="input-style" name="height" onChange={handleChange} />
                    <label>px</label>
                </div>

                <div className="layout-style">
                    <div style={{ width: "50px" }}>Display:</div>
                    <select
                        name="display"
                        onChange={handleChange}
                        defaultValue={selectedComponent?.styles.display || "block"}
                        className="input-style"
                        style={{minWidth: "60px", marginLeft: "20px"}}
                    >
                        {displayOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>

                <div className="layout-style">
                    <div style={{ width: "50px" }}>Position:</div>
                    <select
                        name="position"
                        onChange={handleChange}
                        defaultValue={selectedComponent?.styles.position || "static"}
                        className="input-style"
                        style={{minWidth: "60px", marginLeft: "20px"}}
                    >
                        {positionOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>

                <div className="layout-style">
                <div style={{ width: "150px" }}>Background Color:</div>
                <input
                    type="color"
                    className="input-style"
                    name="backgroundColor"
                    onChange={handleChange}
                />
                </div>

                <div className="layout-style">
            <div style={{ width: "150px" }}>Text Color:</div>
            <input
                type="color"
                className="input-style"
                name="color"
                onChange={handleChange}
            />
                </div>

                <div className="layout-style">
                    <div style={{width: "50px"}}>Padding:</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", marginLeft: "10px" }}>
                        <div></div>
                        <div>
                            <input
                            className="input-style"
                            name="paddingTop"
                            onChange={(e) => handleChange(e, "paddingTop")}
                            />
                            <label>px</label>
                        </div>
                        <div></div>
                        <div>
                            <input
                            className="input-style"
                            name="paddingLeft"
                            onChange={(e) => handleChange(e, "paddingLeft")}
                            />
                            <label>px</label>
                        </div>
                        <div></div>
                        <div>
                            <input
                            className="input-style"
                            name="paddingRight"
                            onChange={(e) => handleChange(e, "paddingRight")}
                            />
                            <label>px</label>
                        </div>
                        <div></div>
                        <div>
                            <input
                            className="input-style"
                            name="paddingBottom"
                            onChange={(e) => handleChange(e, "paddingBottom")}
                            />
                            <label>px</label>
                        </div>
                        <div></div>
                    </div>
                </div>

                <div className="layout-style">
                    <div style={{width: "50px"}}>Margin:</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", marginLeft: "10px" }}>
                        <div></div>
                        <div>
                            <input
                            className="input-style"
                            name="marginTop"
                            onChange={(e) => handleChange(e, "marginTop")}
                            />
                            <label>px</label>
                        </div>
                        <div></div>
                        <div>
                            <input
                            className="input-style"
                            name="marginLeft"
                            onChange={(e) => handleChange(e, "marginLeft")}
                            />
                            <label>px</label>
                        </div>
                        <div></div>
                        <div>
                            <input
                            className="input-style"
                            name="marginRight"
                            onChange={(e) => handleChange(e, "marginRight")}
                            />
                            <label>px</label>
                        </div>
                        <div></div>
                        <div>
                            <input
                            className="input-style"
                            name="marginBottom"
                            onChange={(e) => handleChange(e, "marginBottom")}
                            />
                            <label>px</label>
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>
            
        </Container>
    );
};

export default StyleEditor;
