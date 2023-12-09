import React, { RefObject, useEffect, useId, useRef, useState } from "react";

const useClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: (event: MouseEvent) => void
) => {
  const listener = (event: MouseEvent) => {
    if (!ref.current || ref.current.contains(event.target as Node)) {
      return;
    }
    handler(event);
  };

  useEffect(() => {
    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
};

const openedKeydownHandler = ({
  close,
  activeIndex,
  setActiveIndex,
  options,
  handleSelect,
}: {
  close: () => void;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  options: { value: string; label: string }[];
  handleSelect: (value: string) => void;
}) => {
  const listener = (event: KeyboardEvent) => {
    switch (event.key) {
      case "Escape":
      case "Tab":
        close();
        break;
      case "ArrowDown":
        setActiveIndex((i) => (i + 1 >= options.length ? 0 : i + 1));
        break;
      case "ArrowUp":
        setActiveIndex((i) => (i - 1 < 0 ? options.length - 1 : i - 1));
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        handleSelect(options[activeIndex].value);
        break;
    }
  };

  return listener;
};

const closedKeydownHandler = ({ open }: any) => {
  const listener = (event: KeyboardEvent) => {
    switch (event.key) {
      case "Up":
      case "ArrowUp":
      case "Down":
      case "ArrowDown":
      case " ":
      case "Enter":
        event.preventDefault();
        open();
    }
  };
  return listener;
};

type UseListBoxProps = {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  comboBoxRef: RefObject<HTMLElement>;
};

const useListBox = ({
  onChange,
  value,
  options,
  comboBoxRef,
}: UseListBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const selectedOption = options.find((option) => option.value === value);

  const open = () => {
    setIsOpen(true);
    setActiveIndex(selectedOption ? options.indexOf(selectedOption) : 0);
  };
  const close = () => {
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const handleSelect = (value: string) => {
    onChange(value);
    close();
  };

  useEffect(() => {
    let listener: (event: KeyboardEvent) => void = () => {};
    console.log(document.activeElement);
    if (isOpen) {
      listener = openedKeydownHandler({
        close,
        activeIndex,
        setActiveIndex,
        options,
        handleSelect,
      });
    } else if (document.activeElement === comboBoxRef.current) {
      listener = closedKeydownHandler({
        open,
      });
    }
    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [
    isOpen,
    activeIndex,
    options,
    handleSelect,
    open,
    close,
    comboBoxRef.current,
    document.activeElement,
  ]);

  return {
    isOpen,
    open,
    selectedOption,
    close,
    handleSelect,
    activeIndex,
  };
};

type ListBoxProps = {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
};

export const ListBox: React.FC<ListBoxProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  const comboBoxRef = useRef<HTMLButtonElement>(null);
  const { open, close, isOpen, handleSelect, activeIndex, selectedOption } =
    useListBox({
      options,
      value,
      onChange,
      comboBoxRef,
    });

  const wrapperRef = useRef<HTMLDivElement>(null);
  useClickOutside(wrapperRef, close);

  const labelId = useId();
  const listboxId = useId();

  return (
    <div ref={wrapperRef}>
      <h3 id={labelId}>{label}</h3>
      <button
        ref={comboBoxRef}
        onClick={isOpen ? close : open}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-labelledby={labelId}
        aria-activedescendant={
          activeIndex !== -1
            ? `${listboxId}-${options[activeIndex].value}`
            : undefined
        }
      >
        {selectedOption ? selectedOption.label : "選択してください"}
      </button>
      <ul
        role="listbox"
        id={listboxId}
        aria-labelledby={labelId}
        tabIndex={-1}
        className="listbox"
      >
        {options.map((option, i) => (
          <li
            key={option.value}
            role="option"
            aria-selected={option.value === value}
            id={`${listboxId}-${option.value}`}
            onClick={() => handleSelect(option.value)}
            className={i === activeIndex ? "active" : ""}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
