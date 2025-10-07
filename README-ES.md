# 🚀 Cache Demo App - Frontend

<div align="center">

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

**Aplicación de demostración para visualizar el rendimiento del sistema de caché de Spring Boot en tiempo real**

[Documentación Completa](./DOCUMENTACION.md) • [Características](#-características-principales) • [Instalación](#-instalación-rápida) • [Uso](#-guía-de-uso)

</div>

---

## 📋 Descripción

**Cache Demo App** es una aplicación web interactiva construida con React que permite visualizar, monitorear y analizar el comportamiento del sistema de caché de un backend Spring Boot. Ofrece métricas en tiempo real, comparativas visuales y herramientas de benchmarking para entender el impacto del caching en el rendimiento.

### 🎯 Propósito

- **Educativo:** Herramienta perfecta para enseñar conceptos de caching
- **Monitoreo:** Observa en tiempo real el comportamiento de tu caché
- **Testing:** Ejecuta pruebas de rendimiento automatizadas
- **Demostración:** Muestra visualmente la diferencia entre cache hits y misses

---

## ✨ Características Principales

### 🔥 Visualización en Tiempo Real
- Métricas duales: Tiempo de cliente vs servidor
- Detección automática de cache hits (<50ms) y misses (>500ms)
- Badges visuales con código de colores (verde/amarillo)
- Timestamps de todas las operaciones

### 📊 Historial de Solicitudes
- Buffer circular de las últimas 20 solicitudes
- Re-ejecución de solicitudes con un click
- Vista compacta con métricas clave
- Limpieza manual del historial

### 🗑️ Control de Caché
- **Por ID:** Elimina caché de items específicos
- **Global:** Limpia toda la caché con un click
- **Atajo de teclado:** `Ctrl+Shift+D` para limpieza rápida
- Feedback visual inmediato

### 📈 Benchmarking Automatizado
- Pruebas con 1 llamada fría + N llamadas calientes (configurable)
- Gráfico de líneas interactivo con Recharts
- Tabla detallada de resultados
- Análisis de latencia de red

### ♿ Accesibilidad
- Atributos ARIA completos
- Navegación por teclado
- Contraste WCAG AA
- Estados visuales claros

---

## 🛠️ Stack Tecnológico

| Categoría | Tecnologías |
|-----------|------------|
| **Core** | React 18.3, TypeScript 5.8, Vite 5.4 |
| **UI** | Tailwind CSS 3.4, shadcn/ui (Radix UI) |
| **Gráficos** | Recharts 2.15 |
| **HTTP** | Axios 1.12 |
| **Routing** | React Router 6.30 |
| **Notificaciones** | Sonner 1.7 |
| **Iconos** | Lucide React 0.462 |

---

## 🚀 Instalación Rápida

### Requisitos Previos

```bash
Node.js >= 18.0.0
npm >= 9.0.0
Backend Spring Boot en http://localhost:8080
```

### Pasos de Instalación

```bash
# 1. Clonar repositorio
git clone https://github.com/martinizin/cache-demo-app.git
cd cache-demo-app

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Abrir en navegador
# http://localhost:5173
```

---

## 📖 Guía de Uso

### Escenario 1: Demostrar Cache Hit vs Miss

```
1. Ingresar ID "1" en el campo de texto
2. Click en "Obtener Elemento" → Observar tiempo ~500ms (MISS - amarillo)
3. Click en "Obtener Elemento" nuevamente → Observar tiempo <50ms (HIT - verde)
4. Verificar la diferencia visual en los badges
```

### Escenario 2: Usar Historial

```
1. Realizar varias solicitudes con IDs diferentes (1, 2, 3)
2. Observar el panel "Historial de Solicitudes"
3. Click en cualquier entrada para re-ejecutar esa solicitud
4. El historial se actualiza automáticamente
```

### Escenario 3: Limpiar Caché

```
# Por ID:
1. Click en "Eliminar ID" (o presionar el botón)
2. Siguiente petición al mismo ID será lenta (miss)

# Global:
1. Click en "Eliminar Todo" (o presionar Ctrl+Shift+D)
2. Todas las próximas peticiones serán lentas (miss)
3. Útil para reset completo en demostraciones
```

### Escenario 4: Ejecutar Benchmark

```
1. En panel "Ejecutor de Prueba de Rendimiento"
2. Configurar: ID = 1, Llamadas Calientes = 5
3. Click en "Ejecutar Prueba"
4. Observar gráfico generado:
   - Primera barra alta (fría ~500ms)
   - Siguientes bajas (calientes <50ms)
5. Revisar tabla de datos detallada
```

---

## 📁 Estructura del Proyecto

```
cache-demo-app/
├── src/
│   ├── api/              # Capa de servicios
│   │   └── items.ts      # API REST (fetch, evict)
│   ├── components/       # Componentes React
│   │   ├── CacheDemo.tsx       # Componente principal
│   │   ├── RequestHistory.tsx  # Historial
│   │   ├── Benchmark.tsx       # Benchmarks
│   │   └── ui/                 # Componentes UI (shadcn)
│   ├── hooks/           # Custom hooks
│   ├── lib/             # Utilidades
│   ├── pages/           # Páginas/rutas
│   └── App.tsx          # App raíz
├── public/              # Assets estáticos
├── DOCUMENTACION.md     # 📚 Documentación completa
├── vite.config.ts       # Config de Vite + proxy
└── package.json         # Dependencias
```

---

## 🔧 Configuración

### Proxy de Desarrollo

El proyecto usa un proxy de Vite para comunicarse con el backend:

```typescript
// vite.config.ts
server: {
  proxy: {
    "/api": {
      target: "http://localhost:8080",  // Backend Spring Boot
      changeOrigin: true,
    },
  },
}
```

**Cambiar URL del backend:**
```typescript
// Editar vite.config.ts
target: "http://tu-backend.com",
```

---

## 📚 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo (hot-reload)

# Producción
npm run build        # Build optimizado para producción
npm run preview      # Preview del build de producción

# Calidad
npm run lint         # Verificar código con ESLint
```

---

## 🔍 API Endpoints (Backend)

El frontend consume estos endpoints del backend Spring Boot:

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/items/{id}` | Obtiene un item (puede ser de caché) |
| `DELETE` | `/api/items/cache/{id}` | Elimina caché de un item específico |
| `DELETE` | `/api/items/cache` | Limpia toda la caché |

**Headers importantes:**
- `X-Server-TimeMs`: Tiempo de procesamiento en el servidor

---

## 🎯 Métricas de Rendimiento

### Umbrales de Tiempo

| Tipo | Tiempo | Significado |
|------|--------|-------------|
| **Cache Hit** | < 50ms | ✅ Lectura desde caché en memoria |
| **Cache Miss** | 500-800ms | ⏳ Procesamiento completo |
| **Latencia Red** | 10-50ms | 🌐 Network overhead |

### Interpretación de Resultados

- **Verde "Acierto":** Cache hit exitoso, rendimiento óptimo
- **Amarillo "Fallo":** Cache miss, primera carga o después de evict
- **Diferencia > 50ms:** Posible problema de red o backend

---

## 🐛 Troubleshooting

### Backend no responde

```bash
# Verificar que Spring Boot esté corriendo
curl http://localhost:8080/api/items/1

# Verificar puerto en vite.config.ts
# Debe ser 8080 (o el que uses)
```

### Caché no se limpia

```bash
# Verificar endpoint DELETE en backend
curl -X DELETE http://localhost:8080/api/items/cache

# Revisar implementación @CacheEvict en Spring Boot
```

### Gráfico no aparece

```bash
# Verificar instalación de recharts
npm list recharts

# Reinstalar si es necesario
npm install recharts
```

---

## 🌟 Características Destacadas

### 1. **Medición Dual de Tiempos**
- **Cliente:** Tiempo total de round-trip (frontend → backend → frontend)
- **Servidor:** Tiempo de procesamiento interno (extraído del header)
- **Diferencia:** Permite identificar latencia de red

### 2. **Sistema de Notificaciones**
- Toasts elegantes con Sonner
- Feedback inmediato de todas las operaciones
- Mensajes contextuales (éxito/error)

### 3. **Atajos de Teclado**
- `Enter` en input: Ejecutar obtención
- `Ctrl+Shift+D`: Limpieza global de caché
- Productividad mejorada para usuarios avanzados

### 4. **Responsive Design**
- UI adaptable a diferentes tamaños de pantalla
- Mobile-friendly
- Touch-optimized

---

## 📖 Documentación Extendida

Para información detallada sobre:
- Arquitectura completa del proyecto
- Explicación de cada componente
- Guías de desarrollo
- Mejores prácticas
- API reference completo



## 👤 Autor

**martinizin**
- GitHub: [@martinizin](https://github.com/martinizin)
- Repositorio: [cache-demo-app](https://github.com/martinizin/cache-demo-app)

---


