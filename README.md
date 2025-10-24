# 💻 RepNet Dashboard

En este repositorio está almacenado el código del **dashboard de administrador de RepNet**, y esta es una guía detallada de sus especificaciones y cómo inicializarlo.

---
## Requisitos Previos
Asegúrate de tener instalado:
- Node.js (v18 o superior)
- npm (v9 o superior)
- pnpm (v10 o superior)

## Tecnologías Fundamentales

El servidor está construido sobre los siguientes bloques tecnológicos:

- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000) — Lenguaje de programación  
- ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000) — Frontend framework  
- ![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=reactrouter&logoColor=fff) — Frontend framework
- ![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?logo=shadcnui&logoColor=fff) — Librería de componentes
- ![Aceternity UI](https://img.shields.io/badge/Aceternity_UI-111827?logo=react&logoColor=61DAFB) — Librería de componentes

La combinación de estas tecnologías ofrece componentes con apariencia moderna, minimalista, con una personalización completa de tus componentes, con alta velocidad de desarrollo inicial para el dashboard de **RepNet**.

---

## Acerca de Shadcn/ui y Aceternity UI

Shadcn/ui, a diferencia de librerías como Bootstrap, Chakra UI o Material UI, Shadcn/ui no contiene a sus componentes compilados, sino que a través de su herramienta CLI (Command Line Interface), el desarrollador "recupera" el código fuente del componente indicado al que igual se instalan las dependencias de dicho componente. El por qué de esto es la filosofía de Shadn/ui, darle el control completo (de los componentes) al desarrollador, que seamos capaces de construir nuestra propia librería de componentes.

En cuanto a Aceternity UI, es esencialmente una extensión de Shadcn/UI, es decir, sigue el mismo principio, incluso algunos de sus componentes dependen de componentes de Shadcn/UI y usan la herramienta CLI de Shadcn/ui.

Una de las desventajas es que nuestros componentes, en caso de que salgan sus versiones nuevas (o sean deprecados) y no mantenemos la base de código, causaremos una deuda técnica al proyecto. Sacificamos mantenibilidad por control/personalización. 

Si planeas extender la GUI (Graphic User Interface) existente, tendrás que mantener los componentes regularmente y utilizar la herramienta CLI de Shadcn/ui.

## Instalación

Como aclaración, el proyecto fue construido con la ayuda de la [guía de instalación de Shadcn/ui usando Vite](https://ui.shadcn.com/docs/installation/vite), que predeterminadamente selecciona a pnpm como nuestro administrador de paquetes, pero seguiremos haciendo uso de npm.

### Paso 0

Con el propósito de montar el servidor, hay que clonar este repositorio (tener un repositorio local) como otro repo almacenado en GitHub.  
Dentro de nuestro repositorio local, una manera de comprobar que tienes un repositorio local exitoso (vinculado al repositorio remoto), es la existencia del subdirectorio `.git/`.

```plaintext
repnet-admin-dashboard/
├── .git/
├── admin-dashboard/
├── .gitignore
├── LICENSE
├── README.md
```

### Paso 1

A continuación necesitaremos instalar una serie de dependencias (esto puede tomar un momento) que están indicadas en el archivo `package.json`, ejecutaremos el siguiente comando:

```bash
pnpm install
```

Si la instalación de dependencias fue exitosa, existirá un nuevo subdirectorio nombrado `node_modules/`, este directorio contiene a todas nuestras dependencias instaladas.

```plaintext
repnet-admin-dashboard/
├── .git/
├── admin-dashboard/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── .gitignore
│   ├── components.json
│   ├── eslint.config.js
│   ├── index.html
│   ├── jsconfig.app.json
│   ├── jsconfig.json
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── vite.config.js
├── .gitignore
├── LICENSE
├── README.md
```

En caso de que la instalación de dependencias no fuera exitosa, retorna al paso 0.

### Paso 2

Si hemos llegado a este paso, quiere decir que hemos hecho un repositorio remoto exitoso, e instalado las dependencias del dashboard exitosamente.
A estas alturas, podemos ejecutar el siguiente comando y comprobar que el servidor es montado exitosamente y está listo para servir solicitudes HTTP:

```bash
npm run dev
```

Este comando es un script que monta nuestro vite, en caso de querer saber qué comando y qué opciones se ejecutan, podemos ir a la sección de scripts del archivo `package.json` (dentro de `./admin-dashboard`).

Para comprobar que hemos hecho un montaje exitoso, abramos la terminal de nuestro editor de texto o nuestro IDE (Integrated Development Environment), dado el hecho de que VSCode (un editor de texto) es muy popular, podemos ocupar el atajo `Ctrl + J`.
Como prueba de un montaje correcto, nuestra terminal deberá de desplegar los logs:

```bash
  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

> © 2025 RepNet Server — Desarrollado por el equipo de frontend de RepNet.
