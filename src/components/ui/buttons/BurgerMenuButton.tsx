'use client';

type BurgerMenuButtonProps = {
  onClick: () => void;
};

export default function BurgerMenuButton({ onClick }: BurgerMenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className="p-2 md:hidden"
      aria-label="Toggle menu"
    >
      <span className="burger-line block h-0.5 w-6" />
      <span className="burger-line my-1.5 block h-0.5 w-6" />
      <span className="burger-line block h-0.5 w-6" />
    </button>
  );
}
