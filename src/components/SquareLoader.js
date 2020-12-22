/**
 * Additional classes is for spacing
 * (margin, size, etc).
 */
const SquareLoader = ({ additionalClassName }) => {
  return (
    <div className="flex justify-center items-center">
      <div className={additionalClassName + ' animate-ping bg-blue-200'}></div>
    </div>
  );
};

export default SquareLoader;
