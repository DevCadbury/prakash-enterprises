import React from 'react';

const Input = React.forwardRef(({ className = "", ...props }, ref) => (
  <input ref={ref} className={"border px-3 py-2 rounded w-full " + className} {...props} />
));

export { Input };