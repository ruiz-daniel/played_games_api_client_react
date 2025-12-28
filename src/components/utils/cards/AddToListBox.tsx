

export type AddToListBoxProps = {
  onClick: () => void,
  width?: number | string,
  height?: number
}

const AddToListBox = ({onClick, width = 351, height = 248}: AddToListBoxProps) => {

  return <div className="add-box" style={{width: width, minWidth: width, height}} onClick={onClick}>
    <i className='pi pi-plus'/>
  </div>
}

export default AddToListBox