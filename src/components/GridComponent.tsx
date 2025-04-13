interface GridComponentProps {
  header?: String;
  gridRows?: number;
  gridCols?: number;
  children?: any;
}

const GridComponent: React.FC<GridComponentProps> = ({
  header,
  gridCols = 3,
  gridRows = 2,
  children,
}) => {
  const colClass = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  }[gridCols];

  const rowClass = {
    1: "grid-rows-1",
    2: "grid-rows-2",
    3: "grid-rows-3",
    4: "grid-rows-4",
  }[gridRows];
  return (
    <>
      {header && <div className="pl-4 py-5">{header}</div>}
      <div className={`grid ${colClass} ${rowClass} gap-2 items-center`}>
        {children}
      </div>
    </>
  );
};

export default GridComponent;
