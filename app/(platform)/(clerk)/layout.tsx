type Props = {
  children: React.ReactNode;
};

const ClerkLayout = ({ children }: Props) => {
  return (
    <div className="flex items-center justify-center h-full">{children}</div>
  );
};

export default ClerkLayout;
