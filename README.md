## Historias de usuario

- El usuario puede registrarse en la plataforma con su nombre, email, contraseña.
- El usuario puede iniciar sesión con email y contraseña.
- El usuario puede subir / modificar su foto de perfil.
- El usuario puede subir imágenes en formato JPG / PNG / GIF, con un título.
- El usuario puede listar las imágenes que ha subido.
- El usuario puede eliminar las imágenes que ha subido.
- El usuario puede consultar las imágenes subidas por otros usuarios, aplicando filtros.

## Entidades

### Usuario

- id: Identificador único
	- UUID V4
	- Único por usuario
- name: Nombre y apellidos del usuario
	- Entre 2 y 30 caracteres
	- Puede contener mayúsculas, minúsculas, espacios y guiones
	- No puede contener dobles espacios, ni dobles guiones
	- Ninguna palabra puede empezar, ni terminar, por guiones
- email: [RFC 5322](https://www.ietf.org/rfc/rfc5322.txt)
- password:
    - Entre 8 y 30 caracteres
	- No puede contener espacios
- profilePic:
	- URL de la foto
- images:
	- Array de ids de las imágenes subidas por el usuario