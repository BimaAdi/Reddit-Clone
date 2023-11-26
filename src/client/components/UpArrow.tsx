export default function UpArrow({ selected }: { selected: boolean }) {
  if (selected) {
    return (
      <svg
        className="hover:cursor-pointer"
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="8.06723"
          y="10.8871"
          width="13.8655"
          height="19.1129"
          fill="#0F172A"
        />
        <path d="M15 0L27.9904 13.7903H2.00962L15 0Z" fill="#0F172A" />
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
    >
      <rect
        x="8.06723"
        y="10.8871"
        width="13.8655"
        height="19.1129"
        fill="#D9D9D9"
      />
      <path d="M15 0L27.9904 13.7903H2.00962L15 0Z" fill="#D9D9D9" />
    </svg>
  );
}
