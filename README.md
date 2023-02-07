# Challenge Flock IT (frontEnd)

Este proyecto es una aplicacion que muestra la lista de las provincias de argentinas que se pueden ubicar en el mapa, para hacer uso de esta app requiere el registro previo.

DEMO: https://flock-it-challenge-frontend-bg0s2mn0h-kevob1994.vercel.app/

## Tecnologías

- [React](https://es.reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Tailwind](https://tailwindcss.com/)
- [Axios](https://axios-http.com/docs/intro)
- [React Query](https://react-query-v3.tanstack.com/)
- [Vitest](https://vitest.dev/)

## Requerimientos

1. node 16.15
3. npm 8.11.0

4. `git clone https://github.com/kevob1994/flock-it-challenge-frontend.git`
5. `cd flock-it-challenge-frontend`
6. `npm install`

### Build

Para realizar el build de la aplicación y los paquetes, ejecute el siguiente comando:

```
npm run build
```

### Develop

Para usar la aplicación en ambiente de desarrollo, ejecute el siguiente comando:

```
npm run dev
```

### Tests
Para realizar los test en la aplicación, ejecute el siguiente comando:

```
npm run dev
```

## Consideraciones
-  Para este projecto no hice uso de las librerias react-auth o react-router-auth para autorización de aplicación, utilice un componente propio llamado *ProtectedRoute*<br>
- Para la autentificación cree una app para realizar registro y login<br>
-  Con respecto a la libreria axios-logger me genero problemas al momento de hacer el deploy de proyecto y cree mis propias con la funcionalidad de axios y los interceptors para poder logear las peticiones<br>
- Realice una prueba unitaria muy simple con el uso de una libreria llamada Vitest, ya que la configuración de Jest me generaba problemas relacionados a las variables de entorno, con typescript e importación de archivos.<br>
- Este proyecto funciona en conjunto con https://github.com/kevob1994/flock-it-challenge-backend. En caso de querer probar todo en ambiente local debera clonar `flock-it-challenge-backend` y seguir las instrucciones del README de dicho repo<br>
