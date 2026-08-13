import { Button } from "primereact/button";

const BaseButton = ({ label, onClick, iconClassName, ...props }) => {
  return (
    <Button
      className="flex gap-2 bg-cyan-400 border-none hover:bg-cyan-600 ease-in-out duration-200"
      icon={`pi pi-${iconClassName}`}
      label={label}
      onClick={onClick}
      onMouseLeave={(e) => e.target.blur()}
      onTouchEnd={(e) => e.target.blur()}
      {...props}
    />
  );
};

export default BaseButton;
