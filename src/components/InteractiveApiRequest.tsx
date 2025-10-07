import React, { useState, useEffect } from 'react';
import InlineEditableCodeBlock from './InlineEditableCodeBlock';
import styles from './InlineEditableCodeBlock.module.css';
import reqStyles from './InteractiveApiRequest.module.css';
import CodeBlock from '@theme/CodeBlock';
import CopyableCodeBlock from './CopyableCodeBlock';

// --- PROPS DEFINITION ---
interface ParameterControl {
  type: 'input' | 'select';
  options?: string[];
}

interface InteractiveApiRequestProps {
  apiUrl: string;
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  initialParameters: Record<string, any>;
  parameterControls: Record<string, ParameterControl>;
  codeTemplates: Record<string, { language: string; template: string }>;
  buildBody: (params: Record<string, any>) => Record<string, any>;
  exampleResponse: Record<string, any>;
}

// --- COMPONENT ---
export default function InteractiveApiRequest({
  apiUrl,
  method = 'POST',
  headers = { 'Content-Type': 'application/json' },
  initialParameters,
  parameterControls,
  codeTemplates,
  buildBody,
  exampleResponse,
}: InteractiveApiRequestProps) {
  const [parameters, setParameters] = useState(initialParameters);
  const [selectedTemplate, setSelectedTemplate] = useState(Object.keys(codeTemplates)[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleParameterChange = (key, value) => {
    setParameters((prevParams) => ({
      ...prevParams,
      [key]: value,
    }));
  };

  const handleExecute = async () => {
    setIsLoading(true);
    setResponse(null);
    setError(null);

    const finalHeaders = { ...headers };
    if (parameters.apiKey) {
      finalHeaders['Authorization'] = `Bearer ${parameters.apiKey}`;
    }

    try {
      const res = await fetch(apiUrl, {
        method: method,
        headers: finalHeaders,
        body: JSON.stringify(buildBody(parameters)),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`API Error: ${res.status} ${res.statusText} - ${errorText}`);
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate replacements for the code block
  const replacements = Object.keys(parameterControls).reduce((acc, key) => {
    const control = parameterControls[key];
    if (control.type === 'input') {
      acc[key] = (
        <input
          type="text"
          value={parameters[key]}
          onChange={(e) => handleParameterChange(key, e.target.value)}
          className={styles.inlineInput}
          size={Math.max(String(parameters[key]).length, 15)}
        />
      );
    } else if (control.type === 'select' && control.options) {
      acc[key] = (
        <select
          value={parameters[key]}
          onChange={(e) => handleParameterChange(key, e.target.value)}
          className={styles.inlineSelect}
        >
          {control.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );
    }
    return acc;
  }, {});

  // Generate final code for each template
  const finalCodes = Object.keys(codeTemplates).reduce((acc, key) => {
    let finalCode = codeTemplates[key].template;
    for (const paramKey in parameters) {
      // Basic escaping for strings in code
      const value = typeof parameters[paramKey] === 'string'
        ? parameters[paramKey].replace(/"/g, '\\"')
        : parameters[paramKey];
      finalCode = finalCode.replace(new RegExp(`{{${paramKey}}}`, 'g'), value);
    }
    acc[key] = finalCode;
    return acc;
  }, {});

  const currentTemplate = codeTemplates[selectedTemplate];

  const jsonReplacer = (key, value) => {
    if (typeof value === 'string' && value.length > 200) {
      return value.substring(0, 50) + '... [TRUNCATED]';
    }
    return value;
  };

  return (
    <div className={reqStyles.container}>
       <div className={reqStyles.selectContainer}>
        <select
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
          className={reqStyles.languageSelect}
        >
          {Object.keys(codeTemplates).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
      <InlineEditableCodeBlock
        key={selectedTemplate}
        language={currentTemplate.language}
        code={currentTemplate.template}
        finalCode={finalCodes[selectedTemplate]}
        replacements={replacements}
        onExecute={handleExecute}
        isLoading={isLoading}
      />
      {isLoading && <div className={reqStyles.loading}>Loading...</div>}
      {error && <CodeBlock language="text" title="Error">{error}</CodeBlock>}
      {response && (
        <CopyableCodeBlock
          language="json"
          title="Response"
          fullCode={JSON.stringify(response, null, 2)}
          truncatedCode={JSON.stringify(response, jsonReplacer, 2)}
        />
      )}
      {!isLoading && !error && !response && exampleResponse && (
        <CopyableCodeBlock
          language="json"
          title="Example Response"
          fullCode={JSON.stringify(exampleResponse, null, 2)}
          truncatedCode={JSON.stringify(exampleResponse, jsonReplacer, 2)}
        />
      )}
    </div>
  );
}
