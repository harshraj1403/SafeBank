import HeaderBox from '@/components/HeaderBox'
import React from 'react'
import TotalBalanceBox from '@/components/TotalBalanceBox';

const Home = () => {
  const loggedIn={firstName:'Harsh'};
  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'> 
        <HeaderBox 
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || 'Guest'}
             subtext="Access and manage your account and transactions efficiently."
          />

          <TotalBalanceBox 
            accounts={[]}
            totalBanks={10}
            totalCurrentBalance={10000}
          />
        </header>
      </div>
    </section>
  )
}

export default Home