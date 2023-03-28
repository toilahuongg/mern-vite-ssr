type TProps = {
  title: string;
};
const Heading: React.FC<TProps> = ({ title }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="text-3_5xl font-medium">
        <span className="text-primary">#</span>
        <span className="text-white">{title}</span>
      </div>
      <div className="flex-1 h-1p bg-primary" />
    </div>
  );
};

export default Heading;
