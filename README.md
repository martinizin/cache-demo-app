# � Cache Demo App - Documentación Técnica

<div align="center">

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6.30.1-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)

**Aplicación web interactiva para demostrar y analizar el rendimiento del sistema de caché de Spring Boot**

</div>

---

## 🎯 Descripción General

**Cache Demo App** es una aplicación web frontend moderna construida con React, TypeScript y Vite que proporciona una interfaz interactiva para **demostrar, monitorear y analizar el rendimiento del sistema de caché** de un backend Spring Boot en tiempo real. La aplicación incluye funcionalidades avanzadas como carrito de compras, navegación multi-página y herramientas de benchmarking automatizadas.

### Características Principales

- **📊 Visualización en Tiempo Real:** Métricas duales de cliente y servidor con detección automática de cache hits/misses
- **🛒 Carrito de Compras:** Sistema completo con persistencia en LocalStorage y modal accesible
- **🚀 Ejecutor de Benchmarks:** Página dedicada con pruebas automatizadas (1 cold + N warm calls)
- **📈 Gráficos Interactivos:** Visualización de datos de rendimiento con Recharts
- **⌨️ Atajos de Teclado:** Navegación y controles rápidos para power users
- **♿ Accesibilidad Completa:** ARIA labels, focus management, navegación por teclado
- **🗂️ Navegación Multi-página:** Routing con React Router para organización modular

### Propósito

- **Educativo:** Herramienta perfecta para enseñar conceptos de caching y arquitecturas de sistemas
- **Monitoreo:** Observación en tiempo real del comportamiento del caché en aplicaciones enterprise
- **Testing:** Suite completa de pruebas de rendimiento y análisis de comportamiento
- **Demostración:** Showcase visual de la diferencia entre cache hits y misses

---

## 🏗️ Arquitectura del Proyecto

### Patrón de Arquitectura

El proyecto sigue una arquitectura **Component-Based** de React con separación clara de responsabilidades:

```
┌─────────────────────────────────────────────┐
│         Presentación (UI Layer)              │
│  ┌─────────────┐  ┌─────────────┐           │
│  │  CacheDemo  │  │  Benchmark  │           │
│  │ (Container) │  │ (Component) │           │
│  └─────────────┘  └─────────────┘           │
│         │                 │                   │
│  ┌─────────────┐  ┌─────────────┐           │
│  │ RequestHist │  │   UI Comps  │           │
│  │ (Component) │  │ (shadcn/ui) │           │
│  └─────────────┘  └─────────────┘           │
└─────────────────────────────────────────────┘
                    ▼
┌─────────────────────────────────────────────┐
│        Lógica de Negocio (API Layer)        │
│  ┌─────────────────────────────────────┐   │
│  │     src/api/items.ts                 │   │
│  │  - fetchItem()                       │   │
│  │  - evictById()                       │   │
│  │  - evictAll()                        │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
                    ▼
┌─────────────────────────────────────────────┐
│       Comunicación (HTTP Client)             │
│              Axios + Vite Proxy              │
└─────────────────────────────────────────────┘
                    ▼
┌─────────────────────────────────────────────┐
│      Backend Spring Boot (localhost:8080)    │
│         Endpoints REST + Cache               │
└─────────────────────────────────────────────┘
```

### Flujo de Datos

1. **Usuario interactúa** con los componentes de UI
2. **Componentes** llaman a funciones de la capa API
3. **API Layer** realiza peticiones HTTP usando Axios
4. **Vite Proxy** redirige `/api/*` a `http://localhost:8080`
5. **Backend** procesa la petición y devuelve respuesta + headers
6. **Frontend** captura métricas de tiempo y actualiza estado
7. **UI se re-renderiza** con nuevos datos

---

## 💻 Stack Tecnológico

### Core Framework

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 18.3.1 | Framework UI principal |
| **TypeScript** | 5.8.3 | Tipado estático y seguridad |
| **Vite** | 5.4.19 | Build tool y dev server |

### UI & Styling

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Tailwind CSS** | 3.4.17 | Framework de estilos utility-first |
| **shadcn/ui** | - | Componentes UI accesibles (Radix UI) |
| **Lucide React** | 0.462.0 | Librería de iconos |
| **Recharts** | 2.15.4 | Gráficos y visualización de datos |

### Routing & State

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React Router DOM** | 6.30.1 | Enrutamiento SPA |
| **Tanstack Query** | 5.83.0 | State management para datos remotos |
| **React Hook Form** | 7.61.1 | Manejo de formularios |

### HTTP & API

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Axios** | 1.12.2 | Cliente HTTP para peticiones REST |

### Notifications

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Sonner** | 1.7.4 | Sistema de toasts/notificaciones |

---

## ✨ Features Implementadas

### 🏠 Página Principal (/)
- **Dashboard Principal:** Interfaz unificada con controles de caché y carrito
- **Solicitudes HTTP:** Input para ID de elemento con validación en tiempo real
- **Controles de Caché:** Eliminación por ID específico y limpieza global
- **Carrito Modal:** Sistema de compras con modal accesible
- **Historial de Solicitudes:** Buffer circular de las últimas 20 peticiones
- **Atajos de Teclado:**
  - `Ctrl+Shift+D`: Limpiar caché global
  - `Ctrl+L`: Limpiar historial de solicitudes

### 🛒 Sistema de Carrito de Compras
- **Hook Personalizado:** `useCart` con persistencia en LocalStorage
- **Modal Accesible:** Portal con focus trap y navegación por teclado
- **Gestión de Estado:** IDs únicos, agregar/remover items, cálculo de total
- **Integración API:** Carga automática de detalles usando `fetchItem(id)`
- **Estados de UI:** Loading, error, vacío con feedback visual apropiado

### � Página de Benchmarks (/benchmark)
- **Página Dedicada:** Interfaz especializada para pruebas de rendimiento
- **Ejecutor Automatizado:** 1 llamada en frío + N llamadas en caliente
- **Visualización de Datos:** Gráficos comparativos con Recharts
- **Métricas Detalladas:** Tabla de resultados con tiempos individuales
- **Navegación:** Botón de retorno a página principal

### ♿ Características de Accesibilidad
- **ARIA Completo:** Labels, roles y descripciones en todos los elementos
- **Navegación por Teclado:** Tab, Enter, Escape funcionan correctamente
- **Focus Management:** Trap de foco en modales con restauración apropiada
- **Estados Visuales:** Indicadores claros de loading, error y éxito
- **Contraste:** Colores y tipografía accesibles en tema oscuro

## �📁 Estructura de Archivos

```
cache-demo-app/
├── public/                          # Recursos estáticos
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
│
├── src/                             # Código fuente
│   ├── api/                         # Capa de servicios/API
│   │   └── items.ts                 # Funciones REST + interface Item con price
│   │
│   ├── components/                  # Componentes React
│   │   ├── CacheDemo.tsx            # Dashboard principal con carrito modal
│   │   ├── RequestHistory.tsx       # Historial con botón limpiar + Ctrl+L
│   │   ├── Benchmark.tsx            # Runner de benchmarks (movido a página)
│   │   ├── Cart.tsx                 # Componente de carrito reutilizable
│   │   ├── CartModal.tsx            # Wrapper de Cart en Modal
│   │   ├── Modal.tsx                # Modal accesible con Portal + focus trap
│   │   └── ui/                      # Componentes shadcn/ui
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── badge.tsx
│   │       ├── toast.tsx
│   │       └── ... (otros componentes UI)
│   │
│   ├── hooks/                       # Custom React Hooks
│   │   ├── useCart.ts               # Hook de carrito con LocalStorage
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   │
│   ├── lib/                         # Utilidades y helpers
│   │   └── utils.ts                 # Funciones auxiliares (cn, etc.)
│   │
│   ├── pages/                       # Páginas/rutas de la aplicación
│   │   ├── Index.tsx                # Página principal (CacheDemo)
│   │   ├── BenchmarkPage.tsx        # Página dedicada de benchmarks
│   │   └── NotFound.tsx             # Página 404
│   │
│   ├── App.tsx                      # Router principal con rutas
│   ├── main.tsx                     # Entry point de la aplicación
│   ├── index.css                    # Estilos globales + Tailwind
│   └── vite-env.d.ts                # Tipos de Vite
│
├── index.html                       # HTML base
├── vite.config.ts                   # Configuración de Vite + proxy
├── tailwind.config.ts               # Configuración de Tailwind
├── tsconfig.json                    # Configuración de TypeScript
├── package.json                     # Dependencias + scripts
├── postcss.config.js                # Configuración de PostCSS
├── eslint.config.js                 # Configuración de ESLint
├── components.json                  # Configuración de shadcn/ui
├── README-ES.md                     # README conciso en español
└── DOCUMENTACION.md                 # Documentación técnica completa
```

## 🗺️ Arquitectura de Navegación

### Rutas Configuradas

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/` | `Index.tsx` → `CacheDemo.tsx` | Dashboard principal con controles de caché y carrito |
| `/benchmark` | `BenchmarkPage.tsx` | Página dedicada para pruebas de rendimiento |
| `*` | `NotFound.tsx` | Página 404 para rutas inexistentes |

### Router Configuration

La aplicación utiliza **React Router v6** con `BrowserRouter` para navegación SPA:

```typescript
// src/App.tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/benchmark" element={<BenchmarkPage />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
```

---

## 🧩 Componentes Principales

### 1. **CacheDemo.tsx** (Dashboard Principal)

**Ubicación:** `src/components/CacheDemo.tsx`

**Propósito:** Componente principal que orquesta la funcionalidad de demostración de caché y gestiona el carrito de compras mediante modal.

#### Responsabilidades

- Gestión del estado de la aplicación (loading, resultados, historial, carrito)
- Orquestación de peticiones HTTP al backend con métricas de rendimiento
- Manejo de eventos de usuario y atajos de teclado (`Ctrl+Shift+D`, `Ctrl+L`)
- Integración de carrito modal con gestión de foco
- Coordinación con RequestHistory para re-ejecución de solicitudes

#### Estado Principal

```typescript
interface RequestResult {
  id: string;              // UUID único de la solicitud
  timestamp: Date;         // Momento de la solicitud
  item: Item;              // Datos del item (incluye price)
  clientMs: number;        // Tiempo de respuesta (cliente)
  serverMs: number;        // Tiempo de procesamiento (servidor)
  isCacheHit: boolean;     // Si fue cache hit (<50ms) o miss
}

const [itemId, setItemId] = useState("1");              // ID del item a consultar
const [loading, setLoading] = useState(false);          // Estado de carga general
const [evictingAll, setEvictingAll] = useState(false);  // Estado de limpieza de caché
const [cartOpen, setCartOpen] = useState(false);        // Estado del modal de carrito
const [results, setResults] = useState<RequestResult[]>([]); // Historial de resultados
const [history, setHistory] = useState<HistoryEntry[]>([]); // Historial compacto
const { ids, add, remove, clear, count } = useCart();   // Hook del carrito
```

### 2. **BenchmarkPage.tsx** (Página de Pruebas)

**Ubicación:** `src/pages/BenchmarkPage.tsx`

**Propósito:** Página independiente dedicada exclusivamente a la ejecución de pruebas de rendimiento automatizadas.

#### Características

- **Navegación:** Botón de retorno a página principal con React Router Link
- **Información Contextual:** Card explicativo sobre el funcionamiento de los benchmarks
- **Integración:** Reutiliza el componente `Benchmark.tsx` existente
- **UI Consistente:** Mantiene el diseño y tema de la aplicación

### 3. **Sistema de Carrito de Compras**

#### **useCart.ts** (Custom Hook)

**Ubicación:** `src/hooks/useCart.ts`

**Funcionalidades:**
- Persistencia automática en LocalStorage con clave `cartIds:v1`
- Estado reactivo con IDs únicos (no duplicados)
- API simple: `add(id)`, `remove(id)`, `clear()`, `count`, `ids`

#### **Cart.tsx** (Componente de Carrito)

**Ubicación:** `src/components/Cart.tsx`

**Características:**
- Carga secuencial de detalles usando `fetchItem(id)` 
- Cálculo automático de total con formato de moneda
- Estados de loading, error y vacío con UI apropiada
- Botones accesibles para remover items individuales y vaciar carrito

#### **CartModal.tsx** (Modal Wrapper)

**Ubicación:** `src/components/CartModal.tsx`

**Propósito:** Envoltorio que combina el componente Modal accesible con Cart

#### **Modal.tsx** (Modal Accesible)

**Ubicación:** `src/components/Modal.tsx`

**Features de Accesibilidad:**
- **Portal:** Renderizado en `document.body` para z-index correcto
- **Focus Trap:** Navegación Tab/Shift+Tab contenida dentro del modal
- **Escape Handler:** Cierre con tecla Escape
- **Backdrop Click:** Cierre al hacer click fuera del contenido
- **Focus Restoration:** Devuelve el foco al elemento que abrió el modal
- **ARIA:** `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
- **Scroll Lock:** Previene scroll del body cuando está abierto

#### Funciones Principales

**`handleFetchItem(id?: string | number)`**
- Obtiene un item del backend
- Mide tiempos cliente/servidor
- Determina si fue cache hit (<50ms) o miss
- Actualiza estado y historial

**`handleEvictById()`**
- Elimina del caché un item específico por ID
- Muestra notificación de éxito/error

**`handleEvictAll()`**
- Limpia toda la caché global
- Controla estado de loading específico
- Muestra feedback al usuario

**`getPerformanceBadge(serverMs, isCacheHit)`**
- Genera badge visual (verde=hit, amarillo=miss)
- Muestra iconos y texto apropiados

#### Atajo de Teclado

- **Teclas:** `Ctrl + Shift + D` (Windows/Linux) o `Cmd + Shift + D` (Mac)
- **Acción:** Ejecuta limpieza de caché global
- **Implementación:** useEffect con listener de eventos de teclado

#### UI Sections

1. **Header:** Título y descripción de la aplicación
2. **Fetch Controls:** Input para ID + botones de acción
3. **Request History:** Panel con historial compacto (componente hijo)
4. **Benchmark:** Panel de pruebas de rendimiento (componente hijo)
5. **Results:** Lista detallada de solicitudes ejecutadas

---

### 2. **RequestHistory.tsx** (Historial de Solicitudes)

**Ubicación:** `src/components/RequestHistory.tsx`

**Propósito:** Muestra un panel compacto con las últimas 20 solicitudes realizadas, permitiendo re-ejecutar cualquiera de ellas con un click.

#### Props

```typescript
interface RequestHistoryProps {
  history: HistoryEntry[];         // Array de entradas del historial
  onClearHistory: () => void;      // Callback para limpiar historial
  onRerun: (id: number) => void;   // Callback para re-ejecutar solicitud
}
```

#### Estructura de Datos

```typescript
interface HistoryEntry {
  id: number;        // ID del item consultado
  serverMs: number;  // Tiempo de servidor
  clientMs: number;  // Tiempo de cliente
  hit: boolean;      // true si fue cache hit
  at: number;        // Timestamp de la solicitud
}
```

#### Características

- **Límite de 20 entradas:** Implementa ring buffer (FIFO)
- **Ordenamiento:** Más recientes primero
- **Interactividad:** Click en cualquier entrada para re-ejecutar
- **Feedback visual:** 
  - Hover effect en entradas
  - Color coding (verde=hit, amarillo=miss)
  - Formato de tiempo legible

#### Estados Visuales

- **Vacío:** Muestra mensaje informativo con icono
- **Con datos:** Lista de entradas con métricas

---

### 3. **Benchmark.tsx** (Ejecutor de Pruebas de Rendimiento)

**Ubicación:** `src/components/Benchmark.tsx`

**Propósito:** Ejecuta pruebas de rendimiento automatizadas que consisten en 1 llamada fría + N llamadas calientes, graficando los resultados.

#### Estado Interno

```typescript
const [itemId, setItemId] = useState("1");      // ID a probar
const [warmCount, setWarmCount] = useState(5);  // Número de llamadas calientes
const [running, setRunning] = useState(false);  // Si está ejecutando
const [data, setData] = useState<BenchmarkData[]>([]); // Resultados
```

#### Estructura de Resultados

```typescript
interface BenchmarkData {
  label: string;      // "fría" o "caliente #N"
  serverMs: number;   // Tiempo de servidor
  clientMs: number;   // Tiempo de cliente
}
```

#### Proceso de Ejecución

1. **Preparación:** 
   - Valida inputs
   - Limpia caché del item específico (evictById)
   
2. **Llamada Fría:**
   - Primera petición sin caché
   - Esperado: ~500-800ms (según backend)
   
3. **Llamadas Calientes:**
   - N peticiones consecutivas
   - Esperado: <50ms (cache hit)
   
4. **Visualización:**
   - Gráfico de líneas con Recharts
   - Tabla de datos detallada

#### Componentes Visuales

**Gráfico de Líneas:**
- Eje X: Etiquetas de llamadas (fría, caliente #1, #2...)
- Eje Y: Tiempo en milisegundos
- Serie 1 (azul): Tiempo del Servidor
- Serie 2 (púrpura): Tiempo del Cliente
- Responsive y con tooltips interactivos

**Tabla de Resultados:**
- Columna "Llamada": Tipo de llamada
- Columna "Tiempo del Servidor": Color-coded (verde<50ms, amarillo≥50ms)
- Columna "Tiempo del Cliente": Blanco
- Columna "Diferencia": Latencia de red (clientMs - serverMs)

#### Validaciones

- ID no vacío
- warmCount entre 1 y 20
- No permite múltiples ejecuciones simultáneas

---

## 🔌 API y Servicios

### Módulo: `src/api/items.ts`

Este módulo encapsula toda la lógica de comunicación con el backend Spring Boot.

#### Interfaces de Datos

```typescript
// Estructura de un Item del backend
export interface Item {
  id: string;
  name: string;
  description: string;
}

// Resultado de fetchItem con métricas
export interface FetchItemResult {
  item: Item;
  clientMs: number;   // Tiempo medido en cliente
  serverMs: number;   // Tiempo extraído del header X-Server-TimeMs
}
```

#### Funciones de API

---

**`fetchItem(id: string | number): Promise<FetchItemResult>`**

Obtiene un item del backend y mide tiempos de respuesta.

**Parámetros:**
- `id`: Identificador del item a obtener

**Retorna:**
- Objeto con datos del item + métricas de tiempo

**Proceso:**
1. Captura tiempo inicial con `performance.now()`
2. Ejecuta `GET /api/items/{id}` con Axios
3. Captura tiempo final
4. Calcula `clientMs` (tiempo total de round-trip)
5. Extrae `serverMs` del header `X-Server-TimeMs`
6. Retorna objeto consolidado

**Ejemplo:**
```typescript
const result = await fetchItem(1);
// result = {
//   item: { id: "1", name: "Item Uno", description: "..." },
//   clientMs: 523,
//   serverMs: 501
// }
```

---

**`evictById(id: string | number): Promise<void>`**

Elimina del caché un item específico.

**Parámetros:**
- `id`: Identificador del item a eliminar del caché

**Endpoint:**
- `DELETE /api/items/cache/{id}`

**Comportamiento:**
- Elimina solo el item especificado
- Próxima petición al mismo ID será cache miss
- Otros items en caché no se ven afectados

**Ejemplo:**
```typescript
await evictById(1);
// Cache para item #1 eliminado
// Próximo GET /api/items/1 será lento (miss)
```

---

**`evictAll(): Promise<void>`**

Limpia toda la caché global del backend.

**Endpoint:**
- `DELETE /api/items/cache`

**Comportamiento:**
- Elimina TODOS los items del caché
- Todas las próximas peticiones serán cache misses
- Útil para reset completo en testing

**Ejemplo:**
```typescript
await evictAll();
// Toda la caché limpiada
// Todos los próximos GET serán lentos hasta re-cachear
```

---

### Configuración de Axios

```typescript
import axios from "axios";

// Axios usa configuración base de Vite:
// - baseURL: Automática (proxy de Vite)
// - Timeout: Default de Axios
// - Headers: Accept: application/json
```

### Proxy de Vite

Configurado en `vite.config.ts`:

```typescript
server: {
  proxy: {
    "/api": {
      target: "http://localhost:8080",  // Backend Spring Boot
      changeOrigin: true,
      secure: false,
    },
  },
}
```

**Funcionamiento:**
- Frontend en `http://localhost:5173`
- Peticiones a `/api/*` → redirigidas a `http://localhost:8080/api/*`
- Evita problemas de CORS en desarrollo

---

## ✨ Características Principales

### 1. **Visualización de Rendimiento en Tiempo Real**

- **Métricas duales:** Tiempo de cliente vs servidor
- **Detección automática:** Cache hit/miss basado en umbral (<50ms)
- **Badges visuales:** Verde (hit), Amarillo (miss)
- **Timestamps:** Registro temporal de cada solicitud

### 2. **Historial de Solicitudes**

- **Buffer circular:** Últimas 20 solicitudes
- **Persistencia en sesión:** Mantiene historial mientras la app esté abierta
- **Re-ejecución rápida:** Click en cualquier entrada para repetir
- **Limpieza manual:** Botón para resetear historial

### 3. **Control de Caché**

#### Limpieza por ID
- Elimina caché de un item específico
- Útil para testing de casos específicos
- Requiere ID válido en el input

#### Limpieza Global
- Elimina toda la caché del backend
- Atajo de teclado: `Ctrl+Shift+D`
- Confirmación visual vía toast
- Deshabilitación de UI durante operación

### 4. **Benchmarking Automatizado**

#### Configuración
- **Item ID:** Elemento a probar
- **Llamadas Calientes:** 1-20 (default: 5)

#### Proceso
1. Limpia caché del item
2. Ejecuta llamada fría (sin caché)
3. Ejecuta N llamadas calientes (con caché)
4. Grafica resultados en tiempo real

#### Visualizaciones
- **Gráfico de líneas:** Comparativa visual de tiempos
- **Tabla de datos:** Desglose numérico detallado
- **Análisis de diferencias:** Latencia de red calculada

### 5. **Accesibilidad (A11y)**

- **Atributos ARIA:** Todos los botones tienen `aria-label`
- **Navegación por teclado:** Soporte completo
- **Atajos de teclado:** Operaciones comunes aceleradas
- **Contraste de colores:** Cumple WCAG AA
- **Indicadores visuales:** Estados disabled, loading, hover

### 6. **Experiencia de Usuario (UX)**

#### Feedback Visual
- **Loading states:** Botones con spinners y texto cambiante
- **Disabled states:** Prevención de clicks múltiples
- **Toasts informativos:** Mensajes de éxito/error contextuales
- **Animaciones sutiles:** Transiciones suaves en hover/focus

#### Manejo de Errores
- **Try-catch global:** Captura todas las excepciones de red
- **Mensajes descriptivos:** Errores legibles para el usuario
- **Fallbacks:** UI no se rompe ante errores

#### Rendimiento
- **Lazy evaluation:** Cálculos solo cuando es necesario
- **Memoización:** Callbacks optimizados
- **Cleanup:** Limpieza de listeners en unmount

---

## 🚀 Guía de Instalación

### Requisitos Previos

- **Node.js:** v18.0.0 o superior
- **npm:** v9.0.0 o superior
- **Backend Spring Boot:** Corriendo en `http://localhost:8080`

### Pasos de Instalación

1. **Clonar el repositorio:**
```bash
git clone https://github.com/martinizin/cache-demo-app.git
cd cache-demo-app
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Verificar configuración:**
Asegurarse de que `vite.config.ts` apunte al backend correcto:
```typescript
proxy: {
  "/api": {
    target: "http://localhost:8080",  // Ajustar si es necesario
    changeOrigin: true,
  },
}
```

4. **Iniciar servidor de desarrollo:**
```bash
npm run dev
```

5. **Abrir en navegador:**
```
http://localhost:5173
```

### Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo (hot-reload)

# Producción
npm run build        # Genera build de producción en /dist
npm run preview      # Previsualiza build de producción

# Calidad de Código
npm run lint         # Ejecuta ESLint para verificar código
```

---

## 📖 Guía de Uso

### Flujo de Trabajo Típico

#### 1. **Probar Cache Hit vs Cache Miss**

**Objetivo:** Demostrar la diferencia entre una llamada con y sin caché.

**Pasos:**
1. Ingresar un ID (ej: `1`) en el campo de texto
2. Hacer click en "Obtener Elemento"
3. Observar el tiempo del servidor (debería ser ~500-800ms - **MISS**)
4. Hacer click en "Obtener Elemento" nuevamente (mismo ID)
5. Observar el tiempo del servidor (debería ser <50ms - **HIT**)
6. Verificar badges: Amarillo (Fallo) vs Verde (Acierto)

**Resultado Esperado:**
- Primera llamada: Badge amarillo "Fallo", tiempo alto
- Segunda llamada: Badge verde "Acierto", tiempo bajo

---

#### 2. **Usar Historial de Solicitudes**

**Objetivo:** Re-ejecutar solicitudes previas sin re-escribir el ID.

**Pasos:**
1. Realizar varias solicitudes con diferentes IDs (1, 2, 3)
2. Observar el panel "Historial de Solicitudes"
3. Hacer click en cualquier entrada del historial
4. La solicitud se re-ejecuta automáticamente
5. Nueva entrada aparece en el historial

**Resultado Esperado:**
- Click en entrada ejecuta GET para ese ID
- Historial se actualiza con nueva solicitud
- Máximo 20 entradas (más antiguas se eliminan)

---

#### 3. **Limpiar Caché por ID**

**Objetivo:** Forzar un cache miss en un item específico.

**Pasos:**
1. Obtener item #1 dos veces (segunda debe ser hit)
2. Hacer click en "Eliminar ID"
3. Observar toast de confirmación
4. Obtener item #1 de nuevo
5. Observar que vuelve a ser lento (miss)

**Resultado Esperado:**
- Después de "Eliminar ID", el cache para ese ID se limpia
- Próxima petición al mismo ID es cache miss
- Otros IDs no se ven afectados

---

#### 4. **Limpiar Caché Global**

**Objetivo:** Resetear toda la caché del backend.

**Pasos:**
1. Obtener varios items (1, 2, 3) dos veces cada uno
2. Verificar que todos son cache hits en segunda llamada
3. Hacer click en "Eliminar Todo" (o presionar `Ctrl+Shift+D`)
4. Observar toast "Caché Limpiada"
5. Obtener cualquier item
6. Observar que todos vuelven a ser cache miss

**Resultado Esperado:**
- Todas las próximas peticiones son lentas (miss)
- Útil para reset completo en demostraciones

---

#### 5. **Ejecutar Benchmark**

**Objetivo:** Visualizar gráficamente el impacto del caché.

**Pasos:**
1. En el panel "Ejecutor de Prueba de Rendimiento"
2. Ingresar ID (ej: `1`)
3. Configurar llamadas calientes (ej: `5`)
4. Hacer click en "Ejecutar Prueba"
5. Esperar a que complete (botón muestra "Ejecutando...")
6. Observar gráfico de líneas generado
7. Revisar tabla de resultados debajo

**Resultado Esperado:**
- Gráfico muestra:
  - Primera barra alta (llamada fría ~500ms)
  - Siguientes barras bajas (llamadas calientes <50ms)
- Tabla confirma los datos numéricos
- Columna "Diferencia" muestra latencia de red

---

### Atajos de Teclado

| Atajo | Acción |
|-------|--------|
| `Enter` (en input) | Ejecutar obtención de item |
| `Ctrl + Shift + D` | Limpiar caché global |

---

## ⚙️ Configuración

### Variables de Entorno

El proyecto no requiere variables de entorno para funcionar en desarrollo local, pero puede configurarse si es necesario.

**Archivo:** `.env` (crear en raíz si no existe)

```env
# Puerto del servidor de desarrollo
VITE_PORT=5173

# URL del backend (si es diferente a localhost:8080)
VITE_API_BASE_URL=http://localhost:8080
```

### Configuración de Vite

**Archivo:** `vite.config.ts`

```typescript
export default defineConfig({
  server: {
    host: "::",           // Escucha en todas las interfaces
    port: 5173,           // Puerto del dev server
    proxy: {
      "/api": {
        target: "http://localhost:8080",  // URL del backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),  // Alias @ para imports
    },
  },
});
```

### Configuración de Tailwind

**Archivo:** `tailwind.config.ts`

Contiene el sistema de diseño completo:
- Paleta de colores (dark theme)
- Variables CSS personalizadas
- Configuración de plugins

**Tema Principal:**
```typescript
colors: {
  background: "hsl(220 20% 10%)",   // Fondo oscuro
  foreground: "hsl(210 40% 98%)",   // Texto claro
  primary: "hsl(217 91% 60%)",      // Azul primario
  success: "hsl(142 76% 36%)",      // Verde para hits
  warning: "hsl(38 92% 50%)",       // Amarillo para misses
  // ... más colores
}
```

### Configuración de TypeScript

**Archivo:** `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "strict": true,
    "jsx": "react-jsx",
    "paths": {
      "@/*": ["./src/*"]  // Path mapping para imports
    }
  }
}
```

---

## 💡 Mejores Prácticas

### 1. **Gestión de Estado**

```typescript
// ✅ BUENO: Estado mínimo y derivado
const [loading, setLoading] = useState(false);
const [results, setResults] = useState<Result[]>([]);

// ❌ MALO: Estado redundante
const [loading, setLoading] = useState(false);
const [hasResults, setHasResults] = useState(false); // Derivado de results.length
```

### 2. **Manejo de Errores**

```typescript
// ✅ BUENO: Try-catch con feedback al usuario
try {
  await fetchItem(id);
  toast({ title: "Éxito" });
} catch (error) {
  console.error("Error:", error);
  toast({ 
    title: "Error", 
    description: "Mensaje legible",
    variant: "destructive" 
  });
}

// ❌ MALO: Silenciar errores
try {
  await fetchItem(id);
} catch (error) {
  // No hacer nada
}
```

### 3. **Componentes**

```typescript
// ✅ BUENO: Props tipadas e interfaces claras
interface Props {
  history: HistoryEntry[];
  onClear: () => void;
}

const Component: React.FC<Props> = ({ history, onClear }) => {
  // ...
};

// ❌ MALO: Props sin tipar
const Component = ({ history, onClear }) => {
  // TypeScript no puede ayudar aquí
};
```

### 4. **Performance**

```typescript
// ✅ BUENO: Callbacks memoizados en useEffect
useEffect(() => {
  const handler = () => { /* ... */ };
  window.addEventListener('keydown', handler);
  return () => window.removeEventListener('keydown', handler);
}, [deps]);

// ❌ MALO: Recrear handler en cada render
useEffect(() => {
  window.addEventListener('keydown', () => { /* ... */ });
  // No cleanup
});
```

### 5. **Accesibilidad**

```typescript
// ✅ BUENO: Botones con aria-label
<Button aria-label="Borrar caché global" onClick={handleClear}>
  Eliminar Todo
</Button>

// ❌ MALO: Botones sin contexto
<Button onClick={handleClear}>
  <TrashIcon />
</Button>
```

### 6. **Imports**

```typescript
// ✅ BUENO: Usar alias @ para imports internos
import { fetchItem } from "@/api/items";
import { Button } from "@/components/ui/button";

// ❌ MALO: Rutas relativas largas
import { fetchItem } from "../../api/items";
import { Button } from "../../components/ui/button";
```

### 7. **Tipos**

```typescript
// ✅ BUENO: Interfaces exportadas y reutilizables
export interface Item {
  id: string;
  name: string;
  description: string;
}

// ❌ MALO: Tipos inline repetidos
function process(item: { id: string; name: string }) { }
function display(item: { id: string; name: string }) { }
```

---

## � Instalación y Uso

### Prerrequisitos

- **Node.js** 18+ y npm
- **Backend Spring Boot** ejecutándose en `http://localhost:8080`
- Navegador moderno con soporte para ES6+

### Instalación Rápida

```bash
# Clonar el repositorio
git clone <repository-url>
cd cache-demo-app

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Acceder a la aplicación
# http://localhost:5173
```

### Scripts Disponibles

```bash
npm run dev        # Servidor de desarrollo con hot reload
npm run build      # Build de producción
npm run preview    # Preview del build de producción
npm run lint       # Análisis de código con ESLint
```

---

## ⌨️ Atajos de Teclado

| Atajo | Acción | Contexto |
|-------|--------|----------|
| `Ctrl+Shift+D` | Limpiar caché global | Página principal |
| `Ctrl+L` | Limpiar historial de solicitudes | Página principal |
| `Enter` | Ejecutar solicitud | Campo de input activo |
| `Escape` | Cerrar modal | Modal de carrito abierto |
| `Tab` / `Shift+Tab` | Navegación por teclado | Todos los elementos |

---

## 🎯 Guía de Uso

### Flujo Básico de Demostración

1. **Ejecutar Solicitud:**
   - Ingresar ID en el campo de texto (ej: `1`, `2`, `3`)
   - Hacer click en "Obtener Elemento" o presionar `Enter`
   - Observar métricas de tiempo en la respuesta

2. **Observar Cache Behavior:**
   - Ejecutar la misma solicitud nuevamente
   - Comparar tiempos: primera ejecución (miss) vs segunda (hit)
   - Identificar cache hits por el badge verde y tiempo <50ms

3. **Gestionar Carrito:**
   - Hacer click en "Agregar al Carrito" después de obtener un elemento
   - Observar el badge de contador en el botón "Carrito 🛒"
   - Abrir modal haciendo click en el botón de carrito
   - Gestionar items individualmente o vaciar todo

4. **Ejecutar Benchmarks:**
   - Navegar a `/benchmark` usando el botón "Ejecutar Pruebas"
   - Configurar número de llamadas warm y ID del elemento
   - Observar gráfico comparativo y tabla de resultados detallados

5. **Controlar Caché:**
   - Usar "Eliminar ID" para limpiar caché de elemento específico
   - Usar "Eliminar Todo" o `Ctrl+Shift+D` para limpieza global
   - Verificar efecto ejecutando solicitudes antes/después

---

## 📊 Métricas y Análisis

### Interpretación de Resultados

- **Cache Hit (Verde):** Tiempo servidor <50ms, datos servidos desde caché
- **Cache Miss (Amarillo):** Tiempo servidor >50ms, datos consultados en base de datos
- **Tiempo Cliente:** Incluye latencia de red + procesamiento del navegador
- **Tiempo Servidor:** Solo procesamiento backend (extraído del header `X-Server-TimeMs`)

### Patrones Observables

- **Primera Ejecución:** Siempre cache miss (datos no en caché)
- **Ejecuciones Subsecuentes:** Cache hit si el backend está configurado correctamente
- **Después de Evict:** Vuelve a ser cache miss hasta que se vuelva a cachear

---

## �🔍 Debugging y Troubleshooting

### Problema: "Backend no responde"

**Síntomas:**
- Errores de red en consola
- Toasts de error constantes
- Solicitudes timeout

**Solución:**
1. Verificar que Spring Boot esté corriendo en puerto 8080
2. Verificar endpoints en backend:
   ```bash
   curl http://localhost:8080/api/items/1
   ```
3. Revisar proxy en `vite.config.ts`
4. Verificar CORS en backend si no usa proxy

---

### Problema: "Caché no se limpia"

**Síntomas:**
- Después de "Eliminar Todo" los items siguen siendo rápidos
- Cache hits cuando deberían ser misses

**Solución:**
1. Verificar endpoint DELETE en backend:
   ```bash
   curl -X DELETE http://localhost:8080/api/items/cache
   ```
2. Revisar implementación de `@CacheEvict` en Spring Boot
3. Verificar que el header `X-Server-TimeMs` se está enviando

---

### Problema: "Gráfico de benchmark no aparece"

**Síntomas:**
- Benchmark se ejecuta pero no muestra gráfico
- Errores de Recharts en consola

**Solución:**
1. Verificar que recharts está instalado:
   ```bash
   npm list recharts
   ```
2. Verificar estructura de datos en `BenchmarkData[]`
3. Revisar consola del navegador para errores específicos

---

## 📊 Métricas de Rendimiento

### Umbrales de Tiempo

| Escenario | Tiempo Esperado | Significado |
|-----------|-----------------|-------------|
| **Cache Hit** | < 50ms | Lectura desde caché en memoria |
| **Cache Miss** | 500-800ms | Procesamiento completo en backend |
| **Latencia de Red** | 10-50ms | Diferencia entre clientMs y serverMs |

### Criterios de Evaluación

**Cache Hit exitoso:**
- `serverMs < 50`
- Badge verde "Acierto"
- Diferencia mínima entre llamadas repetidas

**Cache Miss esperado:**
- `serverMs > 500`
- Badge amarillo "Fallo"
- Ocurre después de evict o en primera llamada

---

## 🎨 Sistema de Diseño

### Paleta de Colores (Dark Theme)

```css
:root {
  --background: 220 20% 10%;      /* Fondo principal oscuro */
  --foreground: 210 40% 98%;      /* Texto claro */
  --primary: 217 91% 60%;         /* Azul primario */
  --success: 142 76% 36%;         /* Verde (cache hits) */
  --warning: 38 92% 50%;          /* Amarillo (cache misses) */
  --destructive: 0 84% 60%;       /* Rojo (errores) */
}
```

### Componentes UI (shadcn/ui)

Todos los componentes de UI siguen el sistema de diseño de shadcn/ui:
- **Accesibles por defecto** (Radix UI)
- **Customizables** vía Tailwind
- **Consistentes** con el theme global
- **Tipados** con TypeScript

---

## 🚢 Despliegue a Producción

### Build de Producción

```bash
# Generar build optimizado
npm run build

# Archivos generados en /dist
# - HTML, JS, CSS minificados
# - Assets optimizados
# - Source maps (opcional)
```

### Configurar Backend URL

Para producción, actualizar la URL del backend:

**Opción 1: Variable de entorno**
```env
VITE_API_BASE_URL=https://api.midominio.com
```

**Opción 2: Configuración directa**
```typescript
// src/api/items.ts
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
```






---

## 🎓 Consideraciones de Desarrollo

### Arquitectura Escalable

La aplicación está diseñada con principios de arquitectura limpia y separación de responsabilidades:

- **Componentes Reutilizables:** Modal, Card, Cart pueden ser extraídos a una librería de componentes
- **Custom Hooks:** `useCart` demuestra encapsulación de lógica de negocio
- **API Layer:** Centralización de llamadas HTTP facilita mocking y testing
- **Type Safety:** TypeScript estricto previene errores en tiempo de desarrollo

### Patrones Implementados

- **Container/Presenter Pattern:** CacheDemo como container, componentes UI como presenters
- **Custom Hooks Pattern:** Encapsulación de estado y lógica en `useCart`
- **Portal Pattern:** Modal renderizado fuera del árbol de componentes
- **Compound Component Pattern:** Modal con título, contenido y controles

### Performance Optimizations

- **React 18 Features:** Uso de concurrent rendering para UI no bloqueante
- **Vite HMR:** Hot Module Replacement para desarrollo rápido
- **Tree Shaking:** Bundle optimizado eliminando código no utilizado
- **Code Splitting:** Potencial para lazy loading de páginas con React.lazy

---

## � Recursos Adicionales

### Documentación Relacionada

- **[README-ES.md](./README-ES.md):** Guía rápida en español para usuarios finales
- **[DOCUMENTACION.md](./DOCUMENTACION.md):** Documentación técnica completa con arquitectura detallada
- **[shadcn/ui Docs](https://ui.shadcn.com/):** Documentación de la librería de componentes UI
- **[React Router v6](https://reactrouter.com/):** Guía de navegación y routing

### Learning Resources

Esta aplicación sirve como ejemplo práctico de:
- **Arquitecturas Frontend Modernas:** React + TypeScript + Vite stack
- **Sistemas de Caché:** Conceptos de cache hits, misses y invalidación
- **Accesibilidad Web:** Implementación de ARIA y navegación por teclado
- **State Management:** Hooks personalizados y estado local eficiente
- **Performance Monitoring:** Métricas en tiempo real y benchmarking

---

## 👥 Información del Proyecto

- **Desarrollador Principal:** Martin Jimenez ([martinizin](https://github.com/martinizin))
- **Repositorio:** [cache-demo-app](https://github.com/martinizin/cache-demo-app)
- **Licencia:** MIT
- **Versión:** 1.2.0
- **Última Actualización:** Octubre 2025

### Contribuciones

El proyecto está abierto a contribuciones que mejoren la funcionalidad, accesibilidad o documentación. Las áreas de interés incluyen:

- **Testing:** Implementación de unit tests y e2e tests
- **Internacionalización:** Soporte para múltiples idiomas
- **Temas:** Implementación de tema claro/oscuro toggleable
- **PWA:** Conversión a Progressive Web App
- **Analytics:** Integración de métricas avanzadas de rendimiento

---

<div align="center">

**Cache Demo App** - Demostrando el poder del caching en aplicaciones modernas

Made with ❤️ and ⚡ by **Martin Jimenez**

</div>


