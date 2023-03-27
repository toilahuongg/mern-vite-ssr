import { useMemo } from 'react';

type TProps = {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
const Button: React.FC<TProps> = ({ variant = 'primary', children, ...props }) => {
  const className = useMemo(() => {
    if (variant === 'primary')
      return 'py-2 px-4 cursor-pointer border-primary border border-solid text-white hover:bg-primary/20 hover:font-medium';
    return 'py-2 px-4 cursor-pointer border-gray border border-solid text-gray hover:bg-gray/20 hover:font-medium';
  }, [variant]);
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

export default Button;
