interface IInfoList {
  icon?: string;
  title?: string;
  content?: string | null;
}

const TextView = ({
  icon,
  title,
  content
}: IInfoList) => {
  return (
    <>
      <div className='info-list-header'>
        <span className={`info-list-icon ${icon}`}></span>
        {title}
      </div>
      <p className='info-list-content'>
        {content || 'Unknown'}
      </p>
    </>
  );
};

export default TextView;
