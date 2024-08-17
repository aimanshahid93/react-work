import React from 'react';
import styled from 'styled-components';
import useStore from './store';
import AddWidgetForm from './AddWidgetForm';

const CategoryWrapper = styled.div`
    margin-bottom: 20px;
`;

const CategoryTitle = styled.h2`
    background-color: #f5f5f5;
    padding: 10px;
    margin: 0;
`;

const WidgetWrapper = styled.div`
    border: 1px solid #ddd;
    padding: 10px;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Category = ({ category }) => {
    const { removeWidget } = useStore();
    return (
        <CategoryWrapper>
            <CategoryTitle>{category.name}</CategoryTitle>
            {category.widgets.map(widget => (
                <WidgetWrapper key={widget.id}>
                    <div>
                        <p>{widget.name}</p>
                        <p>{widget.text}</p>
                    </div>
                    <button onClick={() => removeWidget(category.name, widget.id)}>X</button>
                </WidgetWrapper>
            ))}
            <AddWidgetForm categoryName={category.name} />
        </CategoryWrapper>
    );
};

export default Category;
