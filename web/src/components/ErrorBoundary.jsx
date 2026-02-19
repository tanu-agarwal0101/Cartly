import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Button from './ui/Button';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-gray-100 p-8 text-center">
            <div className="bg-red-50 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h1>
            <p className="text-sm text-gray-500 mb-6">
              The application encountered a critical error.
            </p>
            
            <div className="bg-gray-900 rounded-lg p-4 mb-6 text-left overflow-auto max-h-48">
              <code className="text-xs text-red-300 font-mono block mb-2">
                {this.state.error && this.state.error.toString()}
              </code>
              <code className="text-xs text-gray-500 font-mono whitespace-pre-wrap">
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </code>
            </div>

            <Button onClick={() => window.location.href = '/'} className="w-full">
              Return Home
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
