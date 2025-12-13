interface VibeHighlightProps {
  text: string;
  className?: string;
}

/**
 * Highlights the first letter of VIBE category names in yellow/accent color
 * V = Voice & Autonomy
 * I = Impact & Purpose
 * B = Bold Leadership
 * E = Empathy & Recognition
 */
const VibeHighlight = ({ text, className = "" }: VibeHighlightProps) => {
  const vibeLetters = ['V', 'I', 'B', 'E'];
  const firstLetter = text.charAt(0);
  const restOfText = text.slice(1);
  
  const shouldHighlight = vibeLetters.includes(firstLetter);
  
  if (shouldHighlight) {
    return (
      <span className={className}>
        <span className="text-secondary font-bold">{firstLetter}</span>
        {restOfText}
      </span>
    );
  }
  
  return <span className={className}>{text}</span>;
};

export default VibeHighlight;
