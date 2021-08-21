import React, { useState, useEffect } from 'react';
import { useFetch } from './useFetch';
import Follower from './Follower';
function App() {
  const { loading, data } = useFetch();
  const [page, setPage] = useState(0);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    if (loading) return;
    setFollowers(data[page]);
  }, [loading, page]);

  const handelPage = (index) => {
    setPage(index);
    console.log('click!');
  };

  const prevPage = (index) => {
    const location = index - 1 < 0 ? data.length - 1 : index - 1;
    setPage(location);
  };

  const nextPage = (index) => {
    const location = index + 1 < data.length ? index + 1 : 0;
    setPage(location);
  };

  return (
    <main>
      <div className='section-title'>
        <h1>{loading ? 'Loading...🙄' : 'pagination'}</h1>
        <div className='underline'></div>
      </div>
      <section className='followers'>
        <div className='container'>
          {followers.map((follower) => {
            return <Follower key={follower.id} {...follower} />;
          })}
        </div>
        {!loading && (
          <div className='btn-container'>
            <button className='prev-btn' onClick={() => prevPage(page)}>
              prev
            </button>
            {data.map((item, index) => {
              return (
                <button
                  key={index}
                  className={`page-btn ${index === page ? 'active-btn' : null}`}
                  onClick={() => handelPage(index)}>
                  {index + 1}
                </button>
              );
            })}
            <button className='next-btn' onClick={() => nextPage(page)}>
              next
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
