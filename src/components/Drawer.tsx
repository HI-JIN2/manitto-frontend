"use client";

import { useEffect, ReactNode, useState } from "react";

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function Drawer({ isOpen, onClose, children }: DrawerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      // 애니메이션을 위해 약간의 지연
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
      return () => {
        document.body.style.overflow = originalOverflow;
        setIsVisible(false);
      };
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Drawer */}
      <div
        className="fixed top-0 left-0 right-0 z-[101] flex max-h-[85vh] flex-col rounded-b-3xl border-b border-white/10 bg-surface shadow-2xl shadow-black/50 transition-transform duration-300 ease-out"
        style={{
          transform: isVisible ? "translateY(0)" : "translateY(-100%)",
        }}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="h-1 w-12 rounded-full bg-white/20" />
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 pb-6">
          {children}
        </div>
      </div>
    </>
  );
}

