//these components are for home page only

import HeaderBox from '@/components/HeaderBox'
import React from 'react'
import TotalBalanceBox from '@/components/TotalBalanceBox';
import RightSidebar from '@/components/RightSidebar';

const Home = () => {
  const loggedIn={firstName:'Harsh',lastName:'Raj', email:'rajharsh1703@gmail.com'};
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
        {/* recent transaction */}
      </div>

      <RightSidebar 
        user={loggedIn}
        transactions={[]}
        banks={[{currentBalance:4982.34},{currentBalance:13242.43}]}
      />
   
    </section>
  )
}

export default Home