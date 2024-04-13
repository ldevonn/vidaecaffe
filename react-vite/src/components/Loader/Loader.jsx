import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import SyncLoader from 'react-spinners/SyncLoader';

const StyledLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <StyledLoader>
      <SyncLoader loading={loading} size={25} color="#60C460FF" />
    </StyledLoader>
  ) : null;
}

export default Loader;