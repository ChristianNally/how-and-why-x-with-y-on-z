import React from 'react';

const SpecificExample = ({ title, content, codeSnippet }) => {
  return (
    <div className="specific-example">
      <h2>{title}</h2>
      <p>{content}</p>
      <pre><code>{codeSnippet}</code></pre>
    </div>
  );
};

export default SpecificExample;
