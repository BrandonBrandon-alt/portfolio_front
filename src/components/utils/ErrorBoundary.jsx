import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el estado para que el siguiente renderizado muestre la UI de fallback.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // También puedes registrar el error en un servicio de informes de errores
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Puedes renderizar cualquier UI de fallback personalizada
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-background)] text-[var(--color-text-primary)] p-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--color-accent-sith-red)]">¡Algo salió mal!</h1>
          <p className="text-lg mb-6">Lo sentimos, ha ocurrido un error inesperado.</p>
          <p className="text-sm text-[var(--color-text-muted)] mb-8">
            Por favor, intenta recargar la página o contacta al soporte si el problema persiste.
          </p>
          {/* Opcional: Mostrar detalles del error en desarrollo */}
          {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
            <details className="text-left p-4 bg-[var(--color-background)]/50 rounded-md border border-[var(--color-accent-sith-red)]/50 overflow-auto max-h-64">
              <summary className="font-bold text-[var(--color-accent-sith-red)] cursor-pointer">Detalles del Error</summary>
              <pre className="mt-2 whitespace-pre-wrap break-words text-sm">
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
