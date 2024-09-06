import React from 'react';
import BitcoinWidget from './components/BitcoinWidget';

function App() {
  return (
    <div className="App ">
      <div className='w-full h-full lg:h-[100vh] flex flex-col justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 lg:items-center lg:flex-row p-5'>

        <div className='lg:w-1/2 p-10'>
          <h1 className=' text-4xl mb-10 text-white'>Bitcoin Price Converter</h1>
          <p className='text-gray-50'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius odio alias cum libero cupiditate suscipit ut incidunt aliquid, consequuntur molestiae tenetur nesciunt voluptatibus possimus iure neque reprehenderit consequatur doloribus repellat.</p>
        </div>

        <div className='lg:w-1/2'>
          <BitcoinWidget/>
        </div>
      </div>
    </div>
  );
}

export default App;
