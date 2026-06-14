import { useRef, useState } from "react";
import { createUseStyles } from "react-jss";
import axios from "axios";

const useStyles = createUseStyles({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
  },
  card: {
    width: '360px',
    background: 'white',
    padding: '30px',
    boxShadow: '0 5px 10px rgb(0 0 0 / 20%)',
    borderRadius: '3px',
  },
  input: {
    fontSize: '16px',
    margin: '10px 0',
    width: '100%',
  },
  btn: {
    width: '100%',
    color: 'white',
    background: '#00A2FF',
    '&:hover': {
      background: '#32B5FF',
      color: 'white',
    },
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontWeight: 'bold',
    fontSize: '20px',
  },
});

const RegisterPage = () => {
  const s = useStyles();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);
  const [error, setError] = useState(null);
  const [locked, setLocked] = useState(false);

  const handleRegister = async () => {
    setError(null);
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const confirm = confirmRef.current.value;

    if (!username || !password) return setError('Please fill in all fields.');
    if (password !== confirm) return setError('Passwords do not match.');

    setLocked(true);
    try {
      await axios.post('/api/auth/register', { username, password });
      window.location.href = '/';
    } catch (e) {
      if (e.response && e.response.data) {
        setError(e.response.data.errors?.[0]?.message || 'Registration failed.');
      } else {
        setError(e.message);
      }
    } finally {
      setLocked(false);
    }
  };

  return (
    <div className={s.wrapper}>
      <div className={s.card}>
        <div className={s.title}>Create Account</div>
        {error && <p className='text-danger'>{error}</p>}
        <input ref={usernameRef} className={`form-control ${s.input}`} type='text' placeholder='Username' />
        <input ref={passwordRef} className={`form-control ${s.input}`} type='password' placeholder='Password' />
        <input ref={confirmRef} className={`form-control ${s.input}`} type='password' placeholder='Confirm Password' />
        <button disabled={locked} className={`btn ${s.btn} mt-2`} onClick={handleRegister}>
          {locked ? 'Creating account...' : 'Sign Up'}
        </button>
        <p className='mt-3 text-center'>
          Already have an account? <a href='/login'>Log in</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;