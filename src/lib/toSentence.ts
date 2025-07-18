/**
 * Convierte ["a", "b", "c"] → "a, b y c".
 * Maneja casos de 0, 1 o 2 elementos.
 */
export function toSentence(xs: string[]): string {
   if (xs.length === 0) return "";
   if (xs.length === 1) return xs[0];
   if (xs.length === 2) return `${xs[0]} y ${xs[1]}`;
   return `${xs.slice(0, -1).join(", ")} y ${xs.at(-1)}`;
}

/* Ejemplos
toSentence([])                      // ""
toSentence(["pan"])                 // "pan"
toSentence(["pan", "leche"])        // "pan y leche"
toSentence(["pan", "leche", "miel"])// "pan, leche y miel"
*/
