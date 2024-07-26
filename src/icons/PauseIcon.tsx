export function PauseIcon ({ size = 24 }: { size?: number }) {
  return (
    <svg
      fill="none"
      height={`${size / 2.15}`}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width={`${size / 2.15}`}
      xmlns="http://www.w3.org/2000/svg"
    ><path d="M0 0h24v24H0z" stroke="none" /><path d="M9 4H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM17 4h-2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" fill="currentColor" stroke="none" /></svg>
  )
}
