import { useMemo } from 'react';

type TProps = {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
const Button: React.FC<TProps> = ({ variant = 'primary', children, ...props }) => {
  const className = useMemo(() => {
    if (variant === 'primary') return 'btn-primary';
    return 'btn-secondary';
  }, [variant]);
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

export default Button;
