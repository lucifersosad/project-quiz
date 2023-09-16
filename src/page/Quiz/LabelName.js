function LabelName(props){
  const { index, question } = props
  return (
    <>
      <strong>Câu {index+1}: {question}</strong>
    </>
  )
}
export default LabelName;