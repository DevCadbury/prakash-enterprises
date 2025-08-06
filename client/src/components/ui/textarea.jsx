import React from 'react';

const Textarea = React.forwardRef(({ className = "", ...props }, ref) => (
  <textarea ref={ref} className={"border px-3 py-2 rounded w-full " + className} {...props} />
));

export { Textarea };