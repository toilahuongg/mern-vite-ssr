type TProps = {
  children: React.ReactNode;
};
const Container: React.FC<TProps> = ({ children }) => {
  return <div className="container mx-auto my-12">{children}</div>;
};

export default Container;
