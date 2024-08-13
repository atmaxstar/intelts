import Answer from './Answer'

const page = ({ params }: { params: { id: string } }) => {
  return <Answer id={Number(params.id)} />
}

export default page
