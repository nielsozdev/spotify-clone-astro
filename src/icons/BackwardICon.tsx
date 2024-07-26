export function BackwardICon ({ size = 24 }: { size?: number }
) {
  return (
    <svg
      fill="none"
      height={`${size / 1.65}`}
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width={`${size / 1.65}`}
      xmlns="http://www.w3.org/2000/svg"
    ><path d="M0 0h24v24H0z" fill="none" stroke="none" /><path d="M19.496 4.136l-12 7a1 1 0 0 0 0 1.728l12 7a1 1 0 0 0 1.504 -.864v-14a1 1 0 0 0 -1.504 -.864z" fill="currentColor" strokeWidth="0" />
      <path d="M4 4a1 1 0 0 1 .993 .883l.007 .117v14a1 1 0 0 1 -1.993 .117l-.007 -.117v-14a1 1 0 0 1 1 -1z" fill="currentColor" strokeWidth="0" />
    </svg>
  )
}
