interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="overflow-auto h-dvh w-dvw scrollbar-stable">
      <div className="w-full h-full px-10 py-6 app-container min-w-[480px]">
        <div className="m-auto w-full h-full max-w-[900px] flex flex-col gap-6">
          {children}
        </div>
      </div>
    </div>
  );
};
