// Types
import { IInfoList } from "@types";

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
      {content === null || content === '' ? 'Unknown' : content}
      </p>
    </>
  );
};

export default TextView;
