"use client"; // Error components must be Client Components
import React from "react";

type ErrorPageProps = {
  error: Error;
  reset: () => void;
};

const error = ({ error, reset }: ErrorPageProps) => {
  return (
    <div>
      <button onClick={reset}>Reset Error</button>
    </div>
  );
};

export default error;
