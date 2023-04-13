type TProps = {
  title: string;
  variant?: 'left' | 'center' | 'right';
};
const Heading: React.FC<TProps> = ({ title, variant = 'left' }) => {
  return (
    <div className="flex items-center gap-4">
      {['right', 'center'].includes(variant) && <div className="flex-1 h-1p bg-primary" />}
      <div className="text-3_5xl font-medium">
        <span className="text-primary">#</span>
        <span className="text-white">{title}</span>
      </div>
      {['left', 'center'].includes(variant) && <div className="flex-1 h-1p bg-primary" />}
    </div>
  );
};

export default Heading;
