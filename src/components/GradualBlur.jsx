import React, { useEffect, useRef } from 'react';

const GradualBlur = ({
  target = 'parent',
  position = 'bottom',
  height = '6rem',
  strength = 2,
  divCount = 5,
  curve = 'bezier',
  exponential = true,
  opacity = 1
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const targetElement = target === 'parent' ? container.parentElement : container;

    if (!targetElement) return;

    // Clear any existing blur layers
    const existingLayers = container.querySelectorAll('.blur-layer');
    existingLayers.forEach(layer => layer.remove());

    // Create blur layers
    for (let i = 0; i < divCount; i++) {
      const layer = document.createElement('div');
      layer.className = 'blur-layer';
      
      // Calculate blur intensity and opacity for each layer
      const progress = i / (divCount - 1);
      const blurAmount = exponential 
        ? Math.pow(progress, 2) * strength 
        : progress * strength;
      
      const layerOpacity = curve === 'bezier'
        ? cubicBezier(progress) * opacity
        : progress * opacity;

      // Position based on prop
      const positionStyles = {
        bottom: {
          bottom: 0,
          left: 0,
          right: 0,
          height: height
        },
        top: {
          top: 0,
          left: 0,
          right: 0,
          height: height
        }
      };

      Object.assign(layer.style, {
        position: 'absolute',
        ...positionStyles[position],
        backdropFilter: `blur(${blurAmount}px)`,
        WebkitBackdropFilter: `blur(${blurAmount}px)`,
        opacity: layerOpacity,
        pointerEvents: 'none',
        zIndex: 10 + i
      });

      container.appendChild(layer);
    }
  }, [target, position, height, strength, divCount, curve, exponential, opacity]);

  // Cubic bezier easing function
  const cubicBezier = (t) => {
    return t * t * (3 - 2 * t); // Smooth ease-in-out
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    />
  );
};

export default GradualBlur;