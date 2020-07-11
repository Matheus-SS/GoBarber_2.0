import React from 'react';

import { Container } from './styles';

interface TooltipPropsInterface {
  title: string;
  className?: string;
}
const Tooltip: React.FC<TooltipPropsInterface> = ({
  title,
  className,
  children,
}) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;
