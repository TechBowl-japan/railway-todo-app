import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Outlet, useNavigate} from 'react-router-dom';

export const Layout = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const navigate = useNavigate();

  // redirection
  useEffect(() => {
    const loader = async () => {
      console.log(auth);
      // authに何も無ければsignInにリダイレクトする
      if (!auth) {
        console.log('No auth information. Redirect to signin...');
        navigate('/signin');
      }
    };
    loader();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};
