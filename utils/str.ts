export const titleCase = (str: string) => {
   return `${str[0].toUpperCase()}${str.substring(1).toLowerCase()}`;
}