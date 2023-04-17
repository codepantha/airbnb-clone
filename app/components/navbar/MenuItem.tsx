'use client';

interface MenuItemProps {
  onClickHandler: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClickHandler, label }) => {
  return (
    <div
      onClick={onClickHandler}
      className="
        px-4 py-3 hover:bg-neutral-100 transition font-semibold"
    >
      {label}
    </div>
  );
};

export default MenuItem;
