import { useMemo, useState } from 'react';

function useSelectOptions(items, noneLabel, fieldValue) {
  const [search, setSearch] = useState('');

  const options = useMemo(() => {
    const list = Array.isArray(items) ? items : [];
    return [
      {
        id: null,
        name: noneLabel,
        title: noneLabel,
        label: noneLabel,
        isActive: true,
      },
      ...list
        .filter((u) => u.isActive !== false)
        .map((u) => ({ ...u, label: u.name ?? u.title ?? '' })),
    ];
  }, [items, noneLabel]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return q
      ? options.filter((o) => (o.label || '').toLowerCase().includes(q))
      : options;
  }, [search, options]);

  const selected = useMemo(
    () => options.find((o) => o.id === fieldValue) ?? options[0],
    [options, fieldValue]
  );

  return { search, setSearch, options, filtered, selected };
}

export default useSelectOptions;
