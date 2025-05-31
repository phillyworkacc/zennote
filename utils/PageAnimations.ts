const animationDuration = 700


export const pageAnimation = () => {
   document.documentElement.animate(
      [{ scale: 1 }, { scale: 1 }],
      {
         duration: animationDuration,
         easing: "cubic-bezier(0.76, 0, 0.24, 1)",
         fill: "forwards",
         pseudoElement: "::view-transition-old(root)",
      }
   );

   document.documentElement.animate(
      [
         { transform: "translateX(100%)" },
         { transform: "translateX(0)" },
      ],
      {
         duration: animationDuration,
         easing: "cubic-bezier(0.76, 0, 0.24, 1)",
         fill: "forwards",
         pseudoElement: "::view-transition-new(root)",
      }
   );
};

export const pageHomeAnimation = () => {
   document.documentElement.animate(
      [{ scale: 1 }, { scale: 1 }],
      {
         duration: animationDuration,
         easing: "cubic-bezier(0.76, 0, 0.24, 1)",
         fill: "forwards",
         pseudoElement: "::view-transition-old(root)",
      }
   );

   document.documentElement.animate(
      [
         { transform: "translateX(-100%)" },
         { transform: "translateX(0)" },
      ],
      {
         duration: animationDuration,
         easing: "cubic-bezier(0.76, 0, 0.24, 1)",
         fill: "forwards",
         pseudoElement: "::view-transition-new(root)",
      }
   );
};