import React, { useState, useEffect } from 'react';
import AutoResizingTextarea from './AutoResizingTextarea';
import InlineEditableCodeBlock from './InlineEditableCodeBlock';
import styles from './InlineEditableCodeBlock.module.css';
import reqStyles from './InteractiveApiRequest.module.css';
import CodeBlock from '@theme/CodeBlock';
import CopyableCodeBlock from './CopyableCodeBlock';

// --- PROPS DEFINITION ---
interface ParameterControl {
  type: 'input' | 'select' | 'textarea';
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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    // Cleanup function to revoke the object URL to prevent memory leaks
    return () => {
      if (previewUrl) {
        window.URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

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
    setPreviewUrl(null);

    const finalHeaders = { ...headers };
    if (parameters.apiKey) {
      if (headers['x-goog-api-key'] !== undefined) {
        finalHeaders['x-goog-api-key'] = parameters.apiKey;
      } else {
        finalHeaders['Authorization'] = `Bearer ${parameters.apiKey}`;
      }
    }

    let finalApiUrl = apiUrl;
    for (const key in parameters) {
      finalApiUrl = finalApiUrl.replace(new RegExp(`{{${key}}}`, 'g'), parameters[key]);
    }

    try {
      const fetchOptions: RequestInit = {
        method: method,
        headers: finalHeaders,
      };

      if (method !== 'GET' && buildBody) {
        const body = buildBody(parameters);
        if (body) {
          fetchOptions.body = JSON.stringify(body);
        }
      }

      const res = await fetch(finalApiUrl, fetchOptions);

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`API Error: ${res.status} ${res.statusText} - ${errorText}`);
      }

      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        setResponse(data);
      } else {
        setResponse(null);
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);

        // If the content is a video, create a preview URL
        if (blob.type.startsWith('video/')) {
          setPreviewUrl(url);
        }

        // Trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'my_generated_video.mp4';
        document.body.appendChild(a);
        a.click();
        a.remove();
        // The object URL is not revoked here because it's needed for the preview.
        // The useEffect hook will handle cleanup when the component unmounts or the URL changes.
      }
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
      const value = parameters[key] || '';
      const width = Math.max(5, Math.min(value.length, 40)) + 2;
      acc[key] = (
        <input
          type="text"
          value={value}
          onChange={(e) => handleParameterChange(key, e.target.value)}
          className={styles.inlineInput}
          style={{ width: `${width}ch` }}
        />
      );
    } else if (control.type === 'textarea') {
      acc[key] = (
        <AutoResizingTextarea
          value={parameters[key]}
          onChange={(e) => handleParameterChange(key, e.target.value)}
          className={styles.inlineInput}
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
      {isLoading && (
        <div className={reqStyles.loading}>
          <div className={reqStyles.spinner}></div>
        </div>
      )}
      {error && <CodeBlock language="text" title="Error">{error}</CodeBlock>}
      {response && (
        <CopyableCodeBlock
          language="json"
          title="Response"
          fullCode={JSON.stringify(response, null, 2)}
          truncatedCode={JSON.stringify(response, jsonReplacer, 2)}
        />
      )}
      {previewUrl && (
        <div>
          <h3 className={reqStyles.responseTitle}>Preview</h3>
          <video src={previewUrl} controls className={reqStyles.videoPreview} />
        </div>
      )}
      {!isLoading && !error && !response && !previewUrl && exampleResponse && (
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
