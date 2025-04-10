import { ResetIcon } from '@radix-ui/react-icons';
import { useNavigate } from '@remix-run/react';
export default function BackNavigationButton() {
  const navigate = useNavigate();
  return (
    <button
      type='button'
      className='p-4 rounded-md hover:bg-black/5 active:bg-black/10'
      onClick={() => { navigate(-1); }}
    >
      <ResetIcon className='text-5xl' />
    </button>
  );
}