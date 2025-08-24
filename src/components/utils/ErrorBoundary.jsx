import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el estado para que el siguiente renderizado muestre la UI de fallback.
    return {
      hasError: true,
      errorId: Date.now(), // ID único para cada error
    };
  }

  componentDidCatch(error, errorInfo) {
    // También puedes registrar el error en un servicio de informes de errores
    console.error("Uncaught error:", error, errorInfo);
    console.error("Error stack:", error.stack);
    console.error("Component stack:", errorInfo.componentStack);

    // Verificar si el error es relacionado con PDF o navegación
    const isPDFRelated =
      error.message?.includes("pdf") ||
      error.stack?.includes("pdf") ||
      window.location.href.includes("pdf");

    if (isPDFRelated) {
      console.warn(
        "PDF-related error detected, might be caused by returning from external PDF viewer"
      );
    }

    this.setState({ error, errorInfo });
  }

  // Método para intentar recuperarse del error
  handleRetry = () => {
    console.info("Attempting error recovery...");

    this.setState((prevState) => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prevState.retryCount + 1,
    }));

    // Forzar un re-render limpio después de un pequeño delay
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  // Método para navegar al home
  handleGoHome = () => {
    console.info("Navigating to home due to error");
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      // Puedes renderizar cualquier UI de fallback personalizada
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-background)] text-[var(--color-text-primary)] p-8 text-center">
          <div className="max-w-md w-full">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--color-accent-sith-red)]">
              ¡Algo salió mal!
            </h1>
            <p className="text-lg mb-6">
              Lo sentimos, ha ocurrido un error inesperado.
            </p>

            {/* Mensaje específico para errores relacionados con PDFs */}
            {(this.state.error?.message?.includes("pdf") ||
              this.state.error?.stack?.includes("pdf") ||
              window.location.href.includes("pdf")) && (
              <p className="text-sm text-[var(--color-text-muted)] mb-4 p-3 bg-[var(--color-accent-jedi-blue)]/10 rounded-md border border-[var(--color-accent-jedi-blue)]/30">
                <strong>Nota:</strong> Este error puede haber ocurrido al
                regresar desde un visualizador de PDF. Intenta recargar la
                página o volver al inicio.
              </p>
            )}

            <p className="text-sm text-[var(--color-text-muted)] mb-8">
              Por favor, intenta una de las siguientes opciones:
            </p>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={this.handleRetry}
                className="flex-1 px-6 py-3 bg-[var(--color-accent-jedi-green)] text-[var(--color-background)] rounded-lg hover:bg-[var(--color-accent-jedi-green)]/80 transition-all duration-300 font-medium"
              >
                Recargar Página
              </button>
              <button
                onClick={this.handleGoHome}
                className="flex-1 px-6 py-3 border border-[var(--color-accent-jedi-blue)] text-[var(--color-accent-jedi-blue)] rounded-lg hover:bg-[var(--color-accent-jedi-blue)]/20 transition-all duration-300 font-medium"
              >
                Ir al Inicio
              </button>
            </div>

            {/* Información adicional */}
            <p className="text-xs text-[var(--color-text-muted)] mb-4">
              Error ID: {this.state.errorId} | Intentos: {this.state.retryCount}
            </p>

            {/* Opcional: Mostrar detalles del error en desarrollo */}
            {process.env.NODE_ENV === "development" && this.state.errorInfo && (
              <details className="text-left p-4 bg-[var(--color-background)]/50 rounded-md border border-[var(--color-accent-sith-red)]/50 overflow-auto max-h-64">
                <summary className="font-bold text-[var(--color-accent-sith-red)] cursor-pointer mb-2">
                  Detalles del Error (Desarrollo)
                </summary>
                <pre className="mt-2 whitespace-pre-wrap break-words text-xs">
                  <strong>Error:</strong>
                  {this.state.error && this.state.error.toString()}
                  <br />
                  <br />
                  <strong>Stack Trace:</strong>
                  {this.state.error?.stack}
                  <br />
                  <br />
                  <strong>Component Stack:</strong>
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
