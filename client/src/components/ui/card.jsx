import React from 'react';

const Card = ({ children, className = "", ...props }) => (
  <div className={"bg-white shadow rounded-lg p-4 " + className} {...props}>{children}</div>
);

const CardHeader = ({ children, className = "", ...props }) => (
  <div className={"border-b pb-2 mb-2 " + className} {...props}>{children}</div>
);

const CardTitle = ({ children, className = "", ...props }) => (
  <h2 className={"text-lg font-bold " + className} {...props}>{children}</h2>
);

const CardDescription = ({ children, className = "", ...props }) => (
  <p className={"text-sm text-gray-600 " + className} {...props}>{children}</p>
);

const CardContent = ({ children, className = "", ...props }) => (
  <div className={className} {...props}>{children}</div>
);

export { Card, CardHeader, CardTitle, CardDescription, CardContent };