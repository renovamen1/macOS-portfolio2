import React from "react";

interface MenuItemProps {
  onClick?: (e: React.MouseEvent<HTMLLIElement>) => void;
  children: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  danger?: boolean;
  checked?: boolean;
}

interface MenuItemGroupProps {
  border?: boolean;
  children: React.ReactNode;
}

const MenuItem = (props: MenuItemProps) => {
  const { onClick, children, shortcut, disabled, danger, checked } = props;
  const base =
    "leading-6 cursor-default px-2.5 rounded flex items-center justify-between select-none";
  const state = disabled
    ? "opacity-50 pointer-events-none"
    : danger
      ? "text-red-600 hover:text-white hover:bg-red-500"
      : "hover:text-white hover:bg-blue-500";
  return (
    <li
      role="menuitem"
      aria-disabled={!!disabled}
      onClick={onClick}
      className={`${base} ${state}`}
    >
      <span className="flex items-center gap-2">
        {checked && <span className="i-material-symbols:check-small" />}
        {children}
      </span>
      {shortcut && <span className="text-xs text-c-600">{shortcut}</span>}
    </li>
  );
};

const MenuItemGroup = (props: MenuItemGroupProps) => {
  const border =
    props.border === false
      ? "pb-1"
      : "after:(content-empty block pb-0 h-1.5 max-w-full mx-2 border-b border-c-400)";
  return (
    <ul role="menu" className={`relative px-1 pt-1 ${border}`}>
      {props.children}
    </ul>
  );
};

export { MenuItem, MenuItemGroup };
