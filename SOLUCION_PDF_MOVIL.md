# Solución al Problema de PDFs en Móviles

## Problema Identificado

El error "Se produjo un error, por favor revisa" que aparece en móviles al regresar de visualizar PDFs (certificados y CV) se debe principalmente a:

1. **Pérdida de estado de React** cuando se regresa desde aplicaciones externas
2. **Eventos de lifecycle no manejados** (visibilitychange, pageshow, etc.)
3. **Problemas con `window.open()` en móviles**
4. **Falta de manejo de errores específico para PDFs**

## Soluciones Implementadas

### 1. Hook de Visibilidad de Página (`usePageVisibility.js`)

- Maneja eventos de visibilidad y lifecycle de la página
- Detecta cuando se regresa desde aplicaciones externas
- Permite recuperación automática del estado

### 2. Utilidades de PDF Optimizadas (`pdfUtils.js`)

- Detección de dispositivos móviles (iOS, Android)
- Estrategias específicas para cada plataforma:
  - **iOS**: Uso de enlaces temporales para mejor compatibilidad
  - **Android**: Fallback a navegación directa si falla popup
  - **Desktop**: Configuración optimizada de ventanas
- Manejo de errores robusto con fallbacks automáticos

### 3. Sistema de Notificaciones Mejorado

- **Componente Notification**: UI moderna para mostrar mensajes
- **Hook useNotification**: Gestión de estado de notificaciones
- **Contexto NotificationContext**: Sistema global de notificaciones
- Reemplaza alerts nativos con notificaciones más amigables

### 4. ErrorBoundary Mejorado

- Detección específica de errores relacionados con PDFs
- Botones de recuperación automática
- Mensajes contextuales según el tipo de error
- Logging detallado para debugging

### 5. Integración en Componentes

- **CertificateCard**: Manejo seguro de PDFs de certificados
- **HomePageContent**: Apertura optimizada del CV
- **App**: Monitoreo global de visibilidad de página

## Características Principales

### ✅ Compatibilidad Móvil

- Detección automática de dispositivo
- Estrategias específicas por plataforma
- Fallbacks automáticos para popups bloqueados

### ✅ Experiencia de Usuario Mejorada

- Notificaciones visuales en lugar de alerts
- Mensajes de estado informativos
- Recuperación automática de errores

### ✅ Debugging y Monitoreo

- Logging detallado en consola
- IDs únicos para tracking de errores
- Información de performance

### ✅ Accesibilidad

- Notificaciones con roles ARIA apropiados
- Navegación por teclado
- Contraste y legibilidad optimizados

## Archivos Modificados

```
src/
├── hooks/
│   ├── usePageVisibility.js       (NUEVO)
│   └── useNotification.js         (NUEVO)
├── utils/
│   └── pdfUtils.js               (NUEVO)
├── contexts/
│   └── NotificationContext.jsx   (NUEVO)
├── components/
│   ├── ui/
│   │   ├── Notification.jsx      (NUEVO)
│   │   └── CertificateCard.jsx   (MODIFICADO)
│   └── utils/
│       └── ErrorBoundary.jsx     (MODIFICADO)
├── pages/
│   └── HomePageContent.jsx       (MODIFICADO)
└── App.jsx                       (MODIFICADO)
```

## Uso

### Para Abrir PDFs de Forma Segura:

```jsx
import { openPDFSafely } from "../utils/pdfUtils";
import { useNotifications } from "../contexts/NotificationContext";

const MyComponent = () => {
  const notifications = useNotifications();

  const handleOpenPDF = () => {
    openPDFSafely(
      "/path/to/document.pdf",
      "document-name.pdf",
      (error) => {
        notifications.showError(`Error: ${error.message}`);
      },
      notifications
    );
  };
};
```

### Para Mostrar Notificaciones:

```jsx
const notifications = useNotifications();

// Diferentes tipos de notificaciones
notifications.showSuccess("¡Éxito!");
notifications.showError("Error al cargar");
notifications.showWarning("Advertencia");
notifications.showInfo("Información");
```

## Testing en Móviles

Para probar las mejoras:

1. **Abrir certificados en móvil** y verificar que no aparezcan errores al regresar
2. **Abrir CV desde el botón principal** y confirmar funcionamiento correcto
3. **Verificar notificaciones** aparecen correctamente
4. **Probar recuperación de errores** forzando fallos de red

## Beneficios

- ✅ **Eliminación de errores** al regresar de PDFs en móviles
- ✅ **Mejor experiencia de usuario** con notificaciones visuales
- ✅ **Recuperación automática** de errores
- ✅ **Compatibilidad universal** con todos los dispositivos
- ✅ **Debugging mejorado** para futuro mantenimiento
- ✅ **Código mantenible** y reutilizable
