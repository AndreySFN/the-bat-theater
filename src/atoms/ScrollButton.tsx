'use client';

import { Button, ButtonProps } from 'antd';
import React, { ReactNode } from 'react';

interface ScrollButtonProps extends ButtonProps {
  targetId?: string;
  children?: ReactNode;
  id?: string;
  className?: string;
}

const ScrollButton: React.FC<ScrollButtonProps> = ({
  targetId = 'schedule',
  children = 'К расписанию',
  id,
  className,
  ...buttonProps
}) => {
  const handleClick = () => {
    const scheduleElement = document.querySelector(`#${targetId}`);
    if (scheduleElement) {
      scheduleElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Button
      id={id}
      className={className}
      onClick={handleClick}
      {...buttonProps}
    >
      {children}
    </Button>
  );
};

export default ScrollButton;
