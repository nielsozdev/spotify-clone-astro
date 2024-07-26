interface Props {
  children: React.ReactNode
  content: string
  id: string
}

export function Tooltip ({ children, content, id }: Props) {
  return (
    <>
      <button
        aria-label={id}
        data-tooltip-placement="bottom"
        data-tooltip-target={id}
        type="button"
      >
        {children}
      </button>
      <div
        className="absolute text-nowrap  z-50 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        id={id}
        role="tooltip"
      >
        {content}
        <div className="tooltip-arrow" data-popper-arrow="" />
      </div>
    </>

  )
}
