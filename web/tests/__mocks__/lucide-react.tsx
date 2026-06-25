const React = require('react');

const MockIcon = ({ name, ...props }) => {
  return React.createElement('svg', { 'data-testid': `lucide-icon-${name}`, ...props });
};

module.exports = new Proxy(
  {},
  {
    get: (_, property) => {
      if (property === '__esModule') {
        return true;
      }
      return (props) => MockIcon({ name: property, ...props });
    },
  }
);
