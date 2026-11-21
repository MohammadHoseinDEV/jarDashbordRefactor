import React, { useEffect, useMemo, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MENU_ICON_MAP } from '../../../../icons/icons';

function buildPath(url) {
  if (!url) return '/dashboard';
  if (url.startsWith('/')) return url;
  return `/dashboard/${url}`;
}

function MenuItem({
  item,
  isOpen,
  mobile,
  onClose,
  currentPath,
  isDropdownOpen,
  toggleDropdown,
  hoveredItem,
  setHoveredItem,
  setFlyoutPosition,
}) {
  const hasChildren = item.subMenus?.length > 0;
  const itemRef = useRef(null);

  const isActive = currentPath === buildPath(item.url);

  const handleMouseEnter = () => {
    if (!isOpen && hasChildren && itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect();
      setFlyoutPosition({
        top: rect.top,
        right: window.innerWidth - rect.left + 1,
      });
      setHoveredItem(item?.id);
    }
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const content = (
    <div
      className={`relative mb-2 flex items-center rounded-xl py-2 font-[Samim] text-[200px] transition-all duration-200 ${
        isOpen ? 'justify-start px-3' : 'justify-center px-0'
      } ${isActive ? 'text-white' : 'text-white/50 hover:text-white'}`}
      onClick={() => {
        if (hasChildren && isOpen) toggleDropdown(item.id);
      }}
    >
      {MENU_ICON_MAP[item?.icon] ? (
        typeof MENU_ICON_MAP[item?.icon] === 'function' ? (
          <span className="5xl:text-[40px] flex items-center justify-center text-xl text-[25px] text-white">
            {React.createElement(MENU_ICON_MAP[item?.icon])}
          </span>
        ) : (
          <img
            src={MENU_ICON_MAP[item?.icon]}
            alt={item?.icon}
            className="4xl:size-13 flex h-8 w-8 object-contain"
          />
        )
      ) : (
        <span className="text-white/50"></span>
      )}

      {isOpen && (
        <p className="4xl:text-[20px] pr-2 text-[15px] opacity-100 transition-all delay-150 duration-200 md:text-xs xl:text-sm">
          {item?.title}
        </p>
      )}
    </div>
  );

  return (
    <div
      ref={itemRef}
      className={`relative flex w-full cursor-pointer flex-col transition-all delay-75 duration-100 hover:border-r-2 hover:border-r-white ${
        isOpen ? 'pr-3' : ''
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {item.url ? (
        <Link
          to={buildPath(item.url)}
          className="translate-y-2 transition-all delay-75 duration-100"
          onClick={() => onClose?.()}
        >
          {content}
        </Link>
      ) : (
        content
      )}

      {isOpen && (
        <div
          className={`mt-1 overflow-hidden transition-all delay-150 duration-300 ease-in-out ${
            isDropdownOpen(item.id)
              ? 'max-h-[2000px] opacity-100'
              : 'max-h-0 opacity-0'
          }`}
        >
          <div onClick={() => mobile && onClose?.()}>
            {item.subMenus.map((child) => (
              <MenuItem
                key={child.id}
                item={child}
                isOpen={isOpen}
                mobile={mobile}
                onClose={onClose}
                currentPath={currentPath}
                isDropdownOpen={isDropdownOpen}
                toggleDropdown={toggleDropdown}
                hoveredItem={hoveredItem}
                setHoveredItem={setHoveredItem}
                setFlyoutPosition={setFlyoutPosition}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SidebarHome({ isOpen, onClose, mobile, setMobile }) {
  const [dropdownStates, setDropdownStates] = useState({});
  const [hoveredItem, setHoveredItem] = useState(null);
  const [flyoutPosition, setFlyoutPosition] = useState({ top: 0, left: 0 });

  const menusFlat = useSelector((state) => state.auth.menus) || [];
  const location = useLocation();

  const toggleDropdown = (menuId) => {
    setDropdownStates((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const isDropdownOpen = (menuId) => dropdownStates[menuId] || false;

  const allowed = (m) => m?.canView !== false && m?.isActive !== false;

  const menusTree = useMemo(() => {
    const list = menusFlat.filter(allowed);
    const map = new Map(list.map((m) => [m.id, { ...m, subMenus: [] }]));

    const roots = [];
    for (const m of map.values()) {
      if (m.parentMenuId && map.has(m.parentMenuId)) {
        map.get(m.parentMenuId).subMenus.push(m);
      } else {
        roots.push(m);
      }
    }

    const sortRecursive = (items) => {
      items.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
      for (const it of items) sortRecursive(it.subMenus);
    };
    sortRecursive(roots);

    return roots;
  }, [menusFlat]);

  return (
    <div
      className={`no-scrollbar mt-2 flex flex-col items-center justify-center space-y-2 overflow-auto ${isOpen ? 'flex items-center justify-center ' : 'px-0'}`}
    >
      {menusTree.map((m) => (
        <MenuItem
          key={m.id}
          item={m}
          isOpen={isOpen}
          mobile={mobile}
          onClose={onClose}
          currentPath={location.pathname}
          isDropdownOpen={isDropdownOpen}
          toggleDropdown={toggleDropdown}
          hoveredItem={hoveredItem}
          setHoveredItem={setHoveredItem}
          setFlyoutPosition={setFlyoutPosition}
        />
      ))}
      {menusTree.length === 0 && isOpen && (
        <p className="mt-6 text-center font-[Samim] text-white/60">
          منویی برای نمایش وجود ندارد
        </p>
      )}

      {!isOpen && hoveredItem && (
        <div
          className="fixed z-999 min-w-[200px] rounded-lg bg-linear-to-bl from-black to-gray-900 shadow-xl"
          style={{
            top: `${flyoutPosition.top}px`,
            right: `${flyoutPosition.right}px`,
          }}
          onMouseEnter={() => setHoveredItem(hoveredItem)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div className="p-2">
            {menusTree
              .find((m) => m.id === hoveredItem)
              ?.subMenus.map((sub) => (
                <Link
                  key={sub.id}
                  to={buildPath(sub.url)}
                  className="5xl:text-[25px] block rounded px-3 py-2 text-sm text-white/80 transition-colors hover:bg-gray-700"
                  onClick={() => mobile && onClose?.()}
                >
                  {sub.title}
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SidebarHome;
