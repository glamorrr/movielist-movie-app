import { MdCheckCircle } from 'react-icons/md';
import Icon from '@/components/Icon';

const Success = ({ message }) => {
  return (
    <div className="flex items-center space-x-2">
      <Icon size="1.3rem">
        <MdCheckCircle />
      </Icon>
      <p>{message}</p>
    </div>
  );
};

export default Success;
