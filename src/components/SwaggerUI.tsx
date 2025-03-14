import React, { useMemo } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import swaggerSpec from '../api/swagger.yaml?raw';
import yaml from 'js-yaml';

export const SwaggerUIComponent: React.FC = () => {
  const spec = useMemo(() => {
    try {
      const parsedSpec = yaml.load(swaggerSpec);
      return {
        ...parsedSpec,
        servers: [
          {
            url: 'http://localhost:3001/api/v1',
            description: 'Mock API Server'
          }
        ]
      };
    } catch (error) {
      console.error('Error parsing Swagger spec:', error);
      return null;
    }
  }, []);

  if (!spec) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        Error loading API documentation. Please try again later.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Authentication</h3>
            <p className="text-sm text-gray-600 mb-2">
              Use this test API key for all requests:
            </p>
            <code className="block p-3 bg-gray-50 rounded border text-sm font-mono">
              test_api_key_123
            </code>
          </div>
          <div>
            <h3 className="font-medium mb-2">Base URL</h3>
            <code className="block p-3 bg-gray-50 rounded border text-sm font-mono">
              http://localhost:3001/api/v1
            </code>
          </div>
          <div className="text-sm text-gray-600">
            <p>To test any endpoint:</p>
            <ol className="list-decimal ml-5 mt-2 space-y-1">
              <li>Click the endpoint you want to try</li>
              <li>Click the "Authorize" button and enter the API key</li>
              <li>Click "Try it out"</li>
              <li>Fill in the required parameters</li>
              <li>Click "Execute"</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg">
        <SwaggerUI 
          spec={spec}
          supportedSubmitMethods={["get", "post", "put", "delete", "patch"]}
          tryItOutEnabled={true}
          displayRequestDuration={true}
          filter={true}
          deepLinking={true}
          docExpansion="list"
          defaultModelExpandDepth={3}
          showExtensions={true}
          showCommonExtensions={true}
          persistAuthorization={true}
        />
      </div>
    </div>
  );
};