interface WaveSeparatorProps {
  color: string;
}

/**
 * Séparateur vague décoratif entre les niveaux d'une carte.
 * Couleur adaptée à la catégorie.
 */
export function WaveSeparator({ color }: WaveSeparatorProps) {
  return (
    <svg
      viewBox="0 0 400 16"
      className="w-full h-3 my-1"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,8 C50,2 100,14 150,8 C200,2 250,14 300,8 C350,2 400,14 400,8"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        opacity="0.25"
      />
    </svg>
  );
}
