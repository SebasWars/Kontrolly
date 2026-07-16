# Kontrolly

**Kontrolly** es una aplicación SaaS (Software as a Service) pensada para ayudar a pequeños comercios a organizar y digitalizar su operación diaria: control de inventario, punto de venta (TPV), gestión de clientes y facturación.

## 📋 Descripción

Cada usuario registrado en Kontrolly gestiona su propio espacio de trabajo de forma completamente aislada: sus almacenes, su inventario, sus ventas, sus clientes y sus facturas. La aplicación centraliza en un solo lugar procesos que muchos pequeños negocios todavía manejan de forma manual o dispersa en hojas de cálculo.

## ✨ Funcionalidades principales

- **Gestión de almacenes e inventario**: creación de múltiples almacenes, alta y edición de productos, control de stock en tiempo real.
- **Punto de Venta (TPV)**: registro de ventas con validación automática de disponibilidad de stock y descuento de inventario.
- **Cotizaciones**: generación de presupuestos que reservan stock temporalmente hasta que el cliente confirma o rechaza la compra.
- **Gestión de clientes**: almacenamiento de una cartera de clientes con sus datos de contacto, reutilizable al momento de facturar.
- **Facturación en PDF**: generación de documentos de factura descargables con los datos del cliente y el detalle de la venta.
- **Panel financiero**: resumen de ventas totales, número de órdenes, inversión y ganancias, con desglose por mes y por día.
- **Autenticación segura**: registro e inicio de sesión mediante JWT, con contraseñas encriptadas.
- **Multi-tenancy**: cada usuario accede exclusivamente a la información que le pertenece.

## 🛠️ Stack tecnológico

### Frontend
- **React** + **TypeScript**
- **React Router** para el enrutamiento
- **useReducer + useContext** para el manejo de estado global
- **CSS** para los estilos

### Backend
- **Node.js**
- **Arquitectura MVC** para la organización del código y la conexión con la base de datos
- **JWT (JSON Web Tokens)** para la autenticación y protección de rutas
- **Turso** (SQLite distribuido) como base de datos relacional

## 🗄️ Modelo de datos

La base de datos está estructurada de forma relacional, con las siguientes entidades principales:

- `Users` — usuarios registrados en la plataforma
- `Warehouse` — almacenes, vinculados a un usuario
- `Items` — productos, vinculados a un almacén
- `Sales` — ventas o cotizaciones, vinculadas a un almacén y opcionalmente a un cliente
- `Sales_items` — detalle de productos por venta, con precios congelados al momento de la transacción
- `Clients` — clientes del negocio, vinculados a un usuario

Las relaciones se gestionan mediante llaves foráneas, y las operaciones que afectan múltiples tablas (como registrar una venta o editar una factura) se ejecutan dentro de transacciones para garantizar la consistencia de los datos.

## 🔒 Seguridad

- Contraseñas encriptadas con **bcrypt**.
- Rutas protegidas mediante middleware de verificación de JWT.
- Aislamiento de datos por usuario en todas las consultas a la base de datos.
- Sesiones con expiración automática y manejo centralizado de tokens inválidos o caducados.

## 🚀 Instalación y uso

```bash
# Clonar el repositorio
git clone https://github.com/SebasWars/Kontrolly.git
cd Kontrolly

# Instalar dependencias
pnpm install

# Configurar variables de entorno
# Crear un archivo .env con las siguientes variables:
# TURSO_DATABASE_URL=
# TURSO_AUTH_TOKEN=
# JWT_SECRET=
# VITE_API_URL=

# Iniciar el proyecto
pnpm dev
```

## 📌 Estado del proyecto

Proyecto personal en desarrollo activo, construido con un enfoque en la mejora continua y el crecimiento técnico. A lo largo del desarrollo se ha puesto especial énfasis en el diseño de bases de datos relacionales, la arquitectura backend, la gestión de estado global en React (useReducer + useContext) y la aplicación de buenas prácticas de seguridad.

## 👤 Autor

**Sebastián** — [GitHub](https://github.com/SebasWars)
