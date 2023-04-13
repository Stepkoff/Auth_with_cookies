import React from 'react';
import s from './index.module.sass';

const HomePage = () => {
  return (
    <main className={s.homePage}>
      <div className={s.container}>
        <h1>Home page</h1>
        <p>This is demo app with login, registration and updating profile flows.</p>
      </div>
    </main>
  );
};

export default HomePage;