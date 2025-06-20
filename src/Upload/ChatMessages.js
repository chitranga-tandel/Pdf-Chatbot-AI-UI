

import Spinner from './Spinner';
import userIcon from '../assets/user.svg';
import errorIcon from '../assets/error.svg';

export default function ChatMessages({messages}){

  return (
    <div>
      {messages.map(({ role, content, loading, error }, idx) => (
        <div key={idx}>
          {role === 'user' && (
            <img src={userIcon} alt='user icon' />
          )}
          <div>
            <div>
              {(loading && !content) ? <Spinner />
                : <div>{content}</div>
              }
            </div>
            {error && (
              <div>
                <img src={errorIcon} alt='error icon' />
                <span>Error generating the response</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}