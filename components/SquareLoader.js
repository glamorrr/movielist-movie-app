/**
 * Additional classes is for spacing
 * (margin, size, etc).
 */
const SquareLoader = ({ additionalClassName }) => {
  return (
    <div className="flex items-center justify-center">
      <div className={additionalClassName + ' bg-blue-200 animate-ping'}></div>
    </div>
  );
};

export default SquareLoader;
