# Planet Express

**Planet Express** es una aplicación web educativa inspirada en el universo de *Futurama*. Permite explorar personajes, buscar y filtrar sus datos y formar una tripulación personalizada de hasta seis integrantes.

El proyecto está desarrollado con **HTML, CSS y JavaScript vanilla**, sin frameworks ni backend propio. Los personajes se obtienen de una API pública y la tripulación se guarda en el navegador mediante `localStorage`.

## Funcionalidades

### Inicio

- Portada con acceso directo al catálogo de personajes y a Mi tripulación.
- Navegación adaptada a escritorio y móvil, con menú hamburguesa en pantallas pequeñas.

### Explorar personajes

- Carga de personajes desde la API de Futurama mediante `fetch` y `async/await`.
- Tarjetas creadas dinámicamente con JavaScript.
- Búsqueda por nombre y filtros combinables de especie, estado y género.
- Botón **Todos** para restablecer los filtros.
- Paginación en el navegador de **14 personajes por página**. La petición actual solicita **98 personajes**.
- Selección de tripulantes mediante el botón con forma de corazón.

### Mi tripulación

- Posibilidad de guardar **hasta seis personajes diferentes**.
- Conservación de la selección al cambiar de página o recargar, gracias a `localStorage`.
- Visualización de los personajes elegidos y de los huecos disponibles.
- Eliminación individual de tripulantes o vaciado completo de la selección.
- Contador, indicadores de progreso y mensajes según el número de integrantes.
- Apartado **Centro de Misiones** presentado como avance visual. **Las misiones no están implementadas** y sus botones permanecen deshabilitados.

## Tecnologías utilizadas

- **HTML5:** estructura de las tres páginas.
- **CSS3:** diseño adaptable (*mobile first*), Flexbox, Grid y efectos de interacción.
- **JavaScript (módulos ES):** clases, eventos, creación de elementos del DOM, filtros y paginación.
- **Fetch API:** consultas asíncronas a una API externa.
- **Web Storage API (`localStorage`):** almacenamiento local de la tripulación.
- **Git y GitHub:** control de versiones.

### API externa

[Futurama API](https://futuramaapi.com/api)

El servicio `ApiFuturamaService` solicita datos al endpoint `/characters` y transforma cada respuesta al modelo `Character` mediante el método estático `fromJson()`.

**Nota:** es necesaria una conexión a Internet para cargar los personajes desde la API y las fuentes externas.

## Instalación y ejecución local

No es necesario instalar dependencias ni ejecutar `npm install`.

1. Clona el repositorio:

   ```bash
   git clone https://github.com/EstherUc/Futurama.git
   ```

2. Abre la carpeta del proyecto en Visual Studio Code u otro editor.
3. Inicia un servidor local. Por ejemplo, con la extensión **Live Server**, abre `index.html` y selecciona **Open with Live Server**.
4. Accede a la dirección que indique el servidor (habitualmente `http://127.0.0.1:5500/index.html`).

Como alternativa, si tienes Python instalado, desde la carpeta del proyecto puedes ejecutar:

```bash
python -m http.server 5500
```

Después abre `http://localhost:5500/` en el navegador.

> Se recomienda utilizar un servidor local en lugar de abrir los HTML directamente con `file://`, ya que el proyecto utiliza módulos JavaScript.

## Guía rápida de uso

1. En **Inicio**, pulsa **Explorar personajes** para acceder al catálogo.
2. Escribe un nombre o utiliza los desplegables para filtrar los resultados. Puedes combinar varios filtros.
3. Utiliza los botones de paginación para recorrer los personajes disponibles.
4. Pulsa el **corazón** de una tarjeta para añadir o quitar ese personaje de la tripulación. Si ya hay seis integrantes, se muestra un aviso y no se añade otro.
5. En **Mi tripulación**, consulta los integrantes elegidos, elimina uno con su botón **X** o pulsa **Vaciar tripulación** para empezar de nuevo.
6. Pulsa un hueco vacío con el símbolo **+** para volver al catálogo.

La selección se guarda únicamente en el navegador que estés utilizando; no hay cuentas de usuario ni sincronización entre dispositivos.

## Estructura del proyecto

```text
Futurama/
├── index.html
├── explore.html
├── myCrew.html
├── css/
│   ├── variables.css
│   ├── style.css
│   ├── explore.css
│   └── myCrew.css
├── js/
│   ├── components/
│   │   ├── NavMenu.js
│   │   └── CharacterCard.js
│   ├── models/
│   │   └── Character.js
│   ├── services/
│   │   ├── ApiFuturamaService.js
│   │   └── CrewStorageService.js
│   ├── errors/
│   │   └── Errors.js
│   └── pages/
│       ├── index.js
│       ├── explore.js
│       └── myCrew.js
└── assets/
    ├── img/
    └── icons/
```

## Organización del código

- **`Character.js`:** clase que representa a cada personaje y convierte los datos recibidos de la API.
- **`ApiFuturamaService.js`:** concentra las peticiones HTTP y el tratamiento de respuestas.
- **`Errors.js`:** define `ApiError` y `CharacterNotFoundError`, ejemplo de herencia entre clases.
- **`CrewStorageService.js`:** incorpora la lógica para consultar, añadir, quitar y vaciar la tripulación, respetando el máximo de seis.
- **`CharacterCard.js`:** crea las tarjetas mediante el DOM y gestiona la interacción con el corazón.
- **`explore.js`:** coordina la carga, los filtros, la paginación y la representación del catálogo.
- **`myCrew.js`:** genera las tarjetas de la tripulación y actualiza su estado y sus indicadores.
- **`NavMenu.js`:** controla el menú de navegación en móvil.

## Limitaciones y futuras mejoras

- El catálogo utiliza los **98 personajes solicitados**, no todos los personajes disponibles en la API. Los filtros y la paginación actúan sobre los datos cargados.
- Las misiones son una **vista previa sin funcionalidad**; se podrían desarrollar desafíos interactivos en una versión posterior.
- El almacenamiento es local: si se borran los datos del navegador, se pierde la tripulación guardada.
- La aplicación no incorpora autenticación, base de datos ni servidor propio.

## Autoría

**Esther Uclés** — Proyecto educativo, 2026.

Repositorio: [github.com/EstherUc/Futurama](https://github.com/EstherUc/Futurama)

Proyecto educativo no oficial inspirado en *Futurama*.
