interface Props {
  title: string
  toggleAccordion: () => void
  isOpen: boolean
  children: React.ReactNode
}

const Accordion = ({ title, toggleAccordion, isOpen, children }: Props) => {
  return (
    <div className="mb-1 rounded-md border">
      <button
        className="w-full bg-gray-200 p-4 text-left  
                       transition duration-300 hover:bg-gray-300"
        onClick={toggleAccordion}
      >
        {title}
        <span
          className={`float-right${isOpen ? 'rotate-180' : 'rotate-0'}  
                             transition-transform duration-300`}
        >
          &#9660;
        </span>
      </button>
      {isOpen && <div className="bg-white p-4">{children}</div>}
    </div>
  )
}

export default Accordion
