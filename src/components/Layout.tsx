interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="px-10 py-6 h-dvh w-dvw min-w-[440px]">
      <div className="m-auto w-full h-full max-w-[900px] flex flex-col gap-6">
        {children}
      </div>
    </div>
  );
};
