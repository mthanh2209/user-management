interface ITextView {
  label: string;
  content: string;
}
const TextView = ({
  label,
  content
}: ITextView) => (
  <div className='form-item'>
    <label className='form-item-title'>{label}</label>
    <p className='form-edit-content'>
      {content}
    </p>
  </div>
);

export default TextView;
