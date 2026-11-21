import React, { useEffect, useMemo, useRef, useState } from 'react';
import { LuClock5 } from 'react-icons/lu';

function pad2(n) {
  return String(n).padStart(2, '0');
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function normalizeHHmm(value) {
  // Accept "H:mm" / "HH:mm" / "" / null
  if (!value) return '';
  const m = String(value).match(/^(\d{1,2}):(\d{1,2})$/);
  if (!m) return '';
  const hh = clamp(parseInt(m[1], 10), 0, 23);
  const mm = clamp(parseInt(m[2], 10), 0, 59);
  return `${pad2(hh)}:${pad2(mm)}`;
}

export default function TimePickerInput({
  name,
  value,
  onChange, // (name, "HH:mm") => void  OR  ("HH:mm") => void
  placeholder = 'ساعت',
  minuteStep = 5,
  label,
  className = '',
  inputClassName = '',
  disabled = false,
}) {
  const rootRef = useRef(null);
  const inputRef = useRef(null);
  const popupRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(normalizeHHmm(value));
  const [placement, setPlacement] = useState('bottom');

  useEffect(() => {
    setDraft(normalizeHHmm(value));
  }, [value]);

  const hh = useMemo(() => {
    const v = normalizeHHmm(draft);
    if (!v) return null;
    return parseInt(v.slice(0, 2), 10);
  }, [draft]);

  const mm = useMemo(() => {
    const v = normalizeHHmm(draft);
    if (!v) return null;
    return parseInt(v.slice(3, 5), 10);
  }, [draft]);

  const minutes = useMemo(() => {
    const step = Math.max(1, minuteStep);
    const out = [];
    for (let m = 0; m < 60; m += step) out.push(m);
    return out;
  }, [minuteStep]);

  const commit = (next) => {
    const v = normalizeHHmm(next);
    if (typeof onChange === 'function') {
      // Support both signatures:
      // onChange("HH:mm") or onChange(name, "HH:mm")
      if (name) onChange(name, v);
      else onChange(v);
    }
  };

  const pick = (nextHH, nextMM) => {
    const v = `${pad2(nextHH)}:${pad2(nextMM)}`;
    setDraft(v);
    commit(v);
  };

  // Close on outside click + ESC
  useEffect(() => {
    if (!open) return;

    const onDocMouseDown = (e) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) setOpen(false);
    };

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onDocMouseDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onDocMouseDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const calcPlacement = () => {
      const root = rootRef.current;
      if (!root) return;

      const rect = root.getBoundingClientRect();
      const viewportH = window.innerHeight;

      // if popup isn't measured yet, assume around this size
      const popupH = popupRef.current?.offsetHeight ?? 340;

      const spaceBelow = viewportH - rect.bottom;
      const spaceAbove = rect.top;

      const next =
        spaceBelow < popupH && spaceAbove > spaceBelow ? 'top' : 'bottom';

      setPlacement(next);
    };

    // after popup is rendered, measure it
    requestAnimationFrame(calcPlacement);

    window.addEventListener('resize', calcPlacement);
    window.addEventListener('scroll', calcPlacement, true);

    return () => {
      window.removeEventListener('resize', calcPlacement);
      window.removeEventListener('scroll', calcPlacement, true);
    };
  }, [open]);

  const baseInput =
    'w-full rounded-xl bg-white/5 px-3 py-3 font-[AvenirLTProMedium] placeholder:font-[Vazirmatn]  text-[18px] text-white outline-none ' +
    'placeholder:text-white/50 focus:bg-white/15';

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      {label ? (
        <div className="mb-1 pr-1.5 font-[SamimBold] text-[15px] text-white">
          {label}
        </div>
      ) : null}

      <div className="relative">
        <input
          ref={inputRef}
          name={name}
          disabled={disabled}
          value={draft}
          placeholder={placeholder}
          onFocus={() => !disabled && setOpen(true)}
          onClick={() => !disabled && setOpen(true)}
          onChange={(e) => {
            // allow typing; commit only when valid HH:mm
            const next = e.target.value;
            setDraft(next);
            const normalized = normalizeHHmm(next);
            if (normalized) commit(normalized);
            if (next === '') commit('');
          }}
          inputMode="numeric"
          className={`${baseInput} ${inputClassName}`}
        />

        <button
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setOpen((s) => !s)}
          className="absolute top-1/2 left-2 -translate-y-1/2 rounded-lg disabled:opacity-50"
          aria-label="Open time picker"
        >
          <LuClock5 className="size-6 cursor-pointer transition-all delay-75 duration-150 hover:size-7" />
        </button>
      </div>

      {open && !disabled && (
        <div
          ref={popupRef}
          className={[
            'absolute right-0 z-50 w-full min-w-[270px] rounded-2xl border border-white/10 bg-[#0F090C] p-3 shadow-2xl',
            placement === 'bottom' ? 'top-full mt-2' : 'bottom-full mb-2',
          ].join(' ')}
        >
          <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2">
            <div className="text-white/80">
              {normalizeHHmm(draft) || 'انتخاب ساعت'}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-xl bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/15"
                onClick={() => {
                  setDraft('');
                  commit('');
                  setOpen(false);
                }}
              >
                پاک کردن
              </button>
              <button
                type="button"
                className="rounded-xl bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/15"
                onClick={() => setOpen(false)}
              >
                بستن
              </button>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            {/* Minutes */}
            <div>
              <div className="mb-2 text-center text-sm text-white/70">
                دقیقه
              </div>
              <div className="no-scrollbar max-h-48 overflow-auto rounded-xl border border-white/10 p-1">
                {minutes.map((m) => {
                  const active = mm === m;
                  return (
                    <button
                      key={m}
                      type="button"
                      className={[
                        'w-full rounded-lg px-3 py-2 text-center text-white hover:bg-white/10',
                        active ? 'bg-white/15' : '',
                      ].join(' ')}
                      onClick={() => pick(hh ?? 0, m)}
                    >
                      {pad2(m)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hours */}
            <div>
              <div className="mb-2 text-center text-sm text-white/70">ساعت</div>
              <div className="no-scrollbar max-h-48 overflow-auto rounded-xl border border-white/10 p-1">
                {Array.from({ length: 24 }, (_, i) => i).map((h) => {
                  const active = hh === h;
                  return (
                    <button
                      key={h}
                      type="button"
                      className={[
                        'w-full rounded-lg px-3 py-2 text-center text-white hover:bg-white/10',
                        active ? 'bg-white/15' : '',
                      ].join(' ')}
                      onClick={() => pick(h, mm ?? 0)}
                    >
                      {pad2(h)}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
