import React, { useState } from 'react';
import styled from 'styled-components';
import useStore from './store';

const FormWrapper = styled.div`
    margin-top: 10px;
    display: flex;
    gap: 10px;
`;

const AddWidgetForm = ({ categoryName }) => {
    const { addWidget } = useStore();
    const [widgetName, setWidgetName] = useState('');
    const [widgetText, setWidgetText] = useState('');

    const handleSubmit = () => {
        const newWidget = {
            id: Date.now(),
            name: widgetName,
            text: widgetText
        };
        addWidget(categoryName, newWidget);
    };

    return (
        <FormWrapper>
            <input
                type="text"
                placeholder="Widget Name"
                value={widgetName}
                onChange={e => setWidgetName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Widget Text"
                value={widgetText}
                onChange={e => setWidgetText(e.target.value)}
            />
            <button onClick={handleSubmit}>Add Widget</button>
        </FormWrapper>
    );
};

export default AddWidgetForm;
