'use client';

import React, { useState, useRef, useEffect } from 'react';

interface EditableTextProps {
  value: string;
  onSave: (newValue: string) => void;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  multiline?: boolean;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onSave,
  className = '',
  style = {},
  placeholder = 'Click to edit',
  multiline = false,
  tag = 'span'
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editValue.trim() !== value) {
      onSave(editValue.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleBlur = () => {
    handleSave();
  };

  if (isEditing) {
    const InputComponent = multiline ? 'textarea' : 'input';
    return (
      <InputComponent
        ref={inputRef as any}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        className={`editable-input ${className}`}
        style={{
          ...style,
          minHeight: multiline ? '60px' : 'auto',
          resize: multiline ? 'vertical' : 'none',
        }}
        placeholder={placeholder}
      />
    );
  }

  const TagComponent = tag as any;
  return (
    <TagComponent
      className={`editable-text ${className} ${isHovered ? 'hovered' : ''}`}
      style={{ ...style, position: 'relative' }}
      onDoubleClick={handleDoubleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {value || placeholder}
      {isHovered && (
        <span className="editable-tooltip">
          Double-click to edit
        </span>
      )}
    </TagComponent>
  );
};
