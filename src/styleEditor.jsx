import React from 'react';
import { useDispatch } from 'react-redux';
import { updateStyles } from '../src/redux/store';

const StyleEditor = ({ selectedComponentId }) => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateStyles({ id: selectedComponentId, styles: { [name]: `${value}px` } }));
  };

  return (
    <div>
        {selectedComponentId? <div>Component {selectedComponentId} is selected</div> : <div>Please select a component first</div>}
        <div className="styling-elements">
            <div>
                <label>Width:</label>
                <input className="input-style" name="width" onChange={handleChange} />
                <label>px</label>
            </div>
            <div>
                <label>Height:</label>
                <input className="input-style" name="height" onChange={handleChange} />
                <label>px</label>
            </div>
        </div>
    </div>
  );
};

export default StyleEditor;
