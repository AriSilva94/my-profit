export function toSnake(name: string) {
  return name
    .toLowerCase() // tudo em minúsculas
    .normalize("NFD") // separa acentos
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/[^a-z0-9 \-]/g, "") // permite letras, números, espaços e hífens
    .trim() // remove espaços nas pontas
    .replace(/\s+/g, "_"); // espaços → underscore
}
