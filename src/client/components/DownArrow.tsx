"use client";

export default function UpArrow({ selected, onClick = () => {} }: { selected: boolean, onClick?: () => void }) {
  if (selected) {
    return (
      <svg
        className="hover:cursor-pointer"
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
      >
        <rect
          width="13.8655"
          height="19.1129"
          transform="matrix(1 0 0 -1 8.06723 19.1129)"
          fill="#0F172A"
        />
        <path d="M15 30L27.9904 16.2097H2.00962L15 30Z" fill="#0F172A" />
      </svg>
    );
  }

  return (
    <svg
      className="hover:cursor-pointer"
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <rect
        width="13.8655"
        height="19.1129"
        transform="matrix(1 0 0 -1 8.06723 19.1129)"
        fill="#D9D9D9"
      />
      <path d="M15 30L27.9904 16.2097H2.00962L15 30Z" fill="#D9D9D9" />
    </svg>
  );
}
