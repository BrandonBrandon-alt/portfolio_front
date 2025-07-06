import React from 'react';

const Button = ({ onClick, children, className = '', icon: Icon, iconPosition = 'left', as: Component = 'button', ...props }) => {
  return (
    <Component
      onClick={onClick}
      className={`inline-flex items-center justify-center font-sans font-bold py-3 px-8 border-2 border-[var(--color-accent-jedi-blue)] text-[var(--color-accent-jedi-blue)] rounded-md hover:bg-[var(--color-accent-jedi-blue)] hover:text-[var(--color-background)] transition-all duration-300 shadow-[0_0_15px_var(--color-accent-jedi-blue)] hover:shadow-[0_0_30px_var(--color-accent-jedi-blue)] ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <span className="mr-3 text-xl">{Icon}</span>}
      {children}
      {Icon && iconPosition === 'right' && <span className="ml-3 text-xl">{Icon}</span>}
    </Component>
  );
};

export default Button;
