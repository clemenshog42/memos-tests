import React from 'react';

// A simple mock for all lucide-react icons
const MockIcon = ({ name, ...props }: any) => {
  return <svg data-testid={`lucide-icon-${name}`} {...props} />;
};

export default new Proxy(
  {},
  {
    get: (_, property) => {
      if (property === '__esModule') {
        return true;
      }
      return (props: any) => <MockIcon name={property} {...props} />;
    },
  }
);
