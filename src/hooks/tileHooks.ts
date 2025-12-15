import { useState, useEffect } from 'react';

/**
 * Hook to manage tooltip state for skill tiles
 * Shows tooltip on both hover and click with auto-dismiss
 */
export function useTooltip(duration: number = 2000) {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [showTooltip, duration]);

  const handleClick = () => {
    setShowTooltip(true);
  };

  return { showTooltip, handleClick };
}
