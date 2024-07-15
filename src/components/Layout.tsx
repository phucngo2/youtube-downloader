interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="px-10 py-4 h-dvh w-dvw">
      <div className="m-auto w-full max-w-[900px] flex flex-col gap-8">
        {children}
      </div>
    </div>
  );
};
