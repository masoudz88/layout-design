// Layout.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Section from '../src/components/section';
import Button from '../src/components/customizedButton';

const LayoutDesign = () => {
  const components = useSelector(state => state.components.components);
  const [selectedComponentId, setSelectedComponentId] = useState(null);

  const handleSelectComponent = (id) => {
    setSelectedComponentId(id);
  };

  const renderComponent = (comp) => {
    switch (comp.type) {
      case 'section':
        return <Section styles={comp.styles}>{comp.children.map(renderComponent)}</Section>;
      case 'button':
        return <Button styles={comp.styles} text="Click me" />;
      default:
        return null;
    }
  };

  return (
    <div>
        <div className="layout-style">
            {components.map(comp => (
                <div key={comp.id} onClick={() => handleSelectComponent(comp.id)}>
                {renderComponent(comp)}
                </div>
            ))}
      </div>
    </div>
  );
};

export default LayoutDesign;
