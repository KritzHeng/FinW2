// import React from 'react'
import { Fragment } from 'react'
// import { Popover, Transition } from '@headlessui/react'
import 'tailwindcss/tailwind.css';
// import { MenuIcon, XIcon } from '@heroicons/react/outline'


const navigation = [
  { name: 'Market Diff', href: '/market-diff' },
  { name: 'Chart', href: '/chart' },
  { name: 'Trade', href: '/trade' },

]
function Nav() {
  return (

    <form className="flex items-center space-x-6">
   
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32"></div>


        {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font=bold py-2 px-4 rounded">Button</button> */}

    <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
    <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
      <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="-mr-2 flex items-center md:hidden">

          </div>
        </div>
      </div>
      <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
        {navigation.map((item) => (
          <div key={item.name}>
            <a href={item.href} className="font-medium text-gray-500 hover:text-gray-900 px-5">{item.name}</a>
            
          </div>
        ))}
      </div>
    </nav>
    
  </div>

  </div>
      </div>
      </form>
      
  )
}

export default Nav