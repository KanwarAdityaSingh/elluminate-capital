'use client';

import React, { useState } from 'react';
import { EditableText } from './EditableText';

interface NumberItem {
  value: string;
  label: string;
}

interface EditableNumbersProps {
  numbers: NumberItem[];
  onSave: (numbers: NumberItem[]) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const EditableNumbers: React.FC<EditableNumbersProps> = ({
  numbers,
  onSave,
  className = '',
  style = {}
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleValueChange = (index: number, newValue: string) => {
    const updatedNumbers = [...numbers];
    updatedNumbers[index] = { ...updatedNumbers[index], value: newValue };
    onSave(updatedNumbers);
  };

  const handleLabelChange = (index: number, newLabel: string) => {
    const updatedNumbers = [...numbers];
    updatedNumbers[index] = { ...updatedNumbers[index], label: newLabel };
    onSave(updatedNumbers);
  };

  const handleAddNumber = () => {
    const newNumbers = [...numbers, { value: '0', label: 'New Item' }];
    onSave(newNumbers);
  };

  const handleRemoveNumber = (index: number) => {
    if (numbers.length > 1) {
      const newNumbers = numbers.filter((_, i) => i !== index);
      onSave(newNumbers);
    }
  };

  return (
    <div
      className={`editable-numbers ${className}`}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className="editable-tooltip">
          Hover over individual items to edit
        </div>
      )}
      
      <div className="editable-numbers-grid">
        {numbers.map((number, index) => (
          <div
            key={index}
            className="editable-number-item"
          >
            <EditableText
              value={number.value}
              onSave={(newValue) => handleValueChange(index, newValue)}
              tag="div"
              className="editable-number-value"
              placeholder="Value"
            />
            <EditableText
              value={number.label}
              onSave={(newLabel) => handleLabelChange(index, newLabel)}
              tag="div"
              className="editable-number-label"
              placeholder="Label"
            />
            {numbers.length > 1 && (
              <button
                onClick={() => handleRemoveNumber(index)}
                className="editable-remove-btn"
                title="Remove item"
              >
                ×
              </button>
            )}
          </div>
        ))}
        
        <button
          onClick={handleAddNumber}
          className="editable-add-btn"
          title="Add new number item"
        >
          <div className="editable-add-icon">+</div>
          <div className="editable-add-text">Add Item</div>
        </button>
      </div>
    </div>
  );
};
