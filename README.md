# Simple Pokedex!

Aplicación full-stack (ReactJs + Express) que muestra información acerca de los pokemons.

[http://ec2-54-236-49-187.compute-1.amazonaws.com/](http://ec2-54-236-49-187.compute-1.amazonaws.com/)

## Características

- La información se extrae desde una API externa ([https://pokeapi.co/](https://pokeapi.co/)) y se cachea en el lado del servidor por 7 días ([pokedex-promise-v2](https://github.com/PokeAPI/pokedex-promise-v2)). . 
- Se usa una paginación de 20 elementos.
- Se muestran por defecto los siguientes datos:
  - Imagen
  - Nombre
  - Peso
  - Tipo(s)
  - Habilidad(es)
-  Al interactuar con un elemento se abre un diálogo que suma una descripción del pokemon (si es que está disponible).
- El servicio se despliega en una instancia EC2 (AWS).

## Despliegue

Paso a paso:

- Montar una instancia EC2 (AMI: *Amazon Linux 2*).
- Abrir una consola remota vía `ssh`.
- Instalar `git`.
  ```bash
  sudo yum install -y git
  ```
- Clonar este repositorio e ingresar al proyecto creado.
  ```bash
  git clone https://github.com/peperojel/simple-pokedex.git
  cd simple-pokedex
  ```
- Instalar y configurar `docker` - `docker-compose`.
  ```bash
  sudo ./docker.sh
  ```
  *Se debe reiniciar la sesión para que la configuración surta efecto*.
- Desplegar los servicios.
  ```bash
  ./deploy.sh
  ```
- Configurar el *security-group* de la instancia para admitir tráfico público TCP a los puertos **80** (client) y **3000** (server).