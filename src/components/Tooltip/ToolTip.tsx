import React, { ReactNode, useState } from 'react';

type TooltipProps = {
  text: string;
  children: ReactNode;
};

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          style={{
            position: 'absolute',
            bottom: '95%',
            left: '38%',
            transform: 'translateX(-50%)',
            backgroundColor: '#333',
            color: '#fff',
            padding: '5px 10px',
            borderRadius: '5px',
            whiteSpace: 'nowrap',
            zIndex: 1000,
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;

