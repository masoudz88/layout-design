import React from "react";
import { useSelector } from "react-redux";
import { getSelectedComponent } from "../src/redux/store";
import Section from "../src/components/section";
import CustomizedButton from "../src/components/customizedButton";

const LayoutDesign = () => {
    const components = useSelector(state => state.components.components);
    const selectedComponent = useSelector(getSelectedComponent);


    const renderComponent = (comp) => {
        const isSelected = comp.id === selectedComponent?.id;

        // The style if the component is selected
        const selectedStyle = isSelected ? { border: "2px solid blue" } : {};

        switch (comp.type) {
        case "section":
            return <Section styles={{ ...comp.styles, ...selectedStyle }}>{comp.children?.map((child) => renderComponent(child))}</Section>;
        case "button":
            return <CustomizedButton styles={{ ...comp.styles, ...selectedStyle, whiteSpace: "nowrap" }} text={comp.text} />;
        default:
            return null;
        }
    };

    return (
        <div className="layout-design">
            <>
                {components.map(comp => (
                    <div key={comp.id}>
                        {renderComponent(comp)}
                    </div>
                ))}
            </>
        </div>
    );
};

export default LayoutDesign;
