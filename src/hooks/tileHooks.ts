import { useCallback, useState, useEffect } from 'react';

export function useTooltip(duration: number = 2000, onExpire?: () => void) {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => {
        setShowTooltip(false);
        onExpire?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [showTooltip, duration, onExpire]);

  const handleClick = () => setShowTooltip(true);
  const dismiss = useCallback(() => setShowTooltip(false), []);

  return { showTooltip, handleClick, dismiss };
}
