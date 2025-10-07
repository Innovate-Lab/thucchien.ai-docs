import React, { useState } from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import InlineEditableCodeBlock from './InlineEditableCodeBlock';
import styles from './InlineEditableCodeBlock.module.css'; // Using the same CSS for inputs
import reqStyles from './InteractiveApiRequest.module.css';
import CodeBlock from '@theme/CodeBlock';

export default function InteractiveApiRequest() {
  const [apiKey, setApiKey] = useState('<your_api_key>');
  const [model, setModel] = useState('gemini-2.5-flash');
  const [promptText, setPromptText] = useState('Hãy viết một câu giới thiệu về Việt Nam.');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleExecute = async () => {
    setIsLoading(true);
    setResponse(null);
    setError(null);

    try {
      const res = await fetch('https://api.thucchien.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: model,
          messages: [{ role: 'user', content: promptText }],
        }),
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

  const curlTemplate = `curl https://api.thucchien.ai/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer {{apiKey}}" \\
  -d '{
    "model": "{{model}}",
    "messages": [
      {
        "role": "user",
        "content": "{{prompt}}"
      }
    ]
  }'`;

  const pythonTemplate = `# Cấu hình
from openai import OpenAI

client = OpenAI(
    api_key="{{apiKey}}",
    base_url="https://api.thucchien.ai"
)

# Thực thi
response = client.chat.completions.create(
    model="{{model}}",
    messages=[
        {
            "role": "user",
            "content": "{{prompt}}"
        }
    ]
)

print(response.choices[0].message.content)`;

  // Generate the final code strings for the copy button
  const curlCommand = curlTemplate
    .replace('{{apiKey}}', apiKey)
    .replace('{{model}}', model)
    .replace('{{prompt}}', promptText.replace(/"/g, '\\"'));

  const pythonCode = pythonTemplate
    .replace('{{apiKey}}', apiKey)
    .replace('{{model}}', model)
    .replace('{{prompt}}', promptText.replace(/"/g, '\\"'));

  const replacements = {
    apiKey: (
      <input
        type="text"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        className={styles.inlineInput}
        style={{ width: '250px' }}
      />
    ),
    model: (
      <select
        value={model}
        onChange={(e) => setModel(e.target.value)}
        className={styles.inlineSelect}
      >
        <option value="gemini-2.5-pro">gemini-2.5-pro</option>
        <option value="gemini-2.5-flash">gemini-2.5-flash</option>
      </select>
    ),
    prompt: (
      <input
        type="text"
        value={promptText}
        onChange={(e) => setPromptText(e.target.value)}
        className={styles.inlineInput}
        style={{ width: '80%' }}
      />
    ),
  };

  return (
    <div>
      <Tabs>
      <TabItem value="curl" label="curl">
        <InlineEditableCodeBlock
          language="bash"
          code={curlTemplate}
          finalCode={curlCommand}
          replacements={replacements}
        />
      </TabItem>
      <TabItem value="python" label="Python (openai)">
        <InlineEditableCodeBlock
          language="python"
          code={pythonTemplate}
          finalCode={pythonCode}
          replacements={replacements}
        />
      </TabItem>
      </Tabs>

      <div className={reqStyles.executeSection}>
        <button onClick={handleExecute} disabled={isLoading} className={reqStyles.executeButton}>
          {isLoading ? 'Executing...' : 'Execute'}
        </button>
      </div>

      {isLoading && <div className={reqStyles.loading}>Loading...</div>}
      {error && <CodeBlock language="text" title="Error">{error}</CodeBlock>}
      {response && <CodeBlock language="json" title="Response">{JSON.stringify(response, null, 2)}</CodeBlock>}
    </div>
  );
}
