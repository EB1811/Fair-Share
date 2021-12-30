const Footer2 = () => (
    <div className='bg-white pt-16 pb-10 lg:pt-44 lg:pb-32'>
        <div className='max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-16 grid grid-rows-4 sm:grid-rows-1 grid-flow-row sm:grid-flow-col grid-cols-3 sm:grid-cols-12 gap-4'>
            <div className='mb-10 sm:mb-0 row-span-2 sm:col-span-4 col-start-1 col-end-4 sm:col-end-5 flex flex-col items-start text-left'>
                <span className='font-bold text-3xl text-gray-800'>
                    Split
                    <span style={{ color: '#0555b6' }}>Sum</span>
                </span>
                <p className='mt-4 text-gray-700'>
                    Our service helps you solve day-to-day sharing problems
                    using mathematical algorithms that achieve fair results.
                </p>
                <p className='mt-4 m-0 text-gray-500'>
                    Designed and Built by Emmanuil B.
                </p>
                <a href='https://eb1811.github.io/'>
                    <p className=' text-gray-500 underline hover:text-gray-700'>
                        eb1811.github.io
                    </p>
                </a>
            </div>
            <div className='row-span-2 sm:col-span-2 sm:col-start-7 sm:col-end-9 flex flex-col text-left font-semibold'>
                <h5 className='text-gray-800 mb-3 text-2xl'>Share</h5>
                <ul className='text-gray-500 p-0'>
                    <li className='my-2 hover:text-blue-800 cursor-pointer transition-all'>
                        <a
                            className='text-inherit'
                            style={{ textDecoration: 'none' }}
                            href='/Distribute/localremote/Rent'
                        >
                            <span className='text-inherit'>Rent</span>
                        </a>
                    </li>
                    <li className='my-2 hover:text-blue-800 cursor-pointer transition-all'>
                        <a
                            className='text-inherit'
                            style={{ textDecoration: 'none' }}
                            href='/Distribute/localremote/Goods'
                        >
                            <span className='text-inherit'>Goods</span>
                        </a>
                    </li>
                    <li className='my-2 hover:text-blue-800 cursor-pointer transition-all'>
                        <a
                            className='text-inherit'
                            style={{ textDecoration: 'none' }}
                            href='/Distribute/localremote/Divorce'
                        >
                            <span className='text-inherit'>Finances</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className='row-span-2 sm:col-span-2 sm:col-start-9 sm:col-end-11 flex flex-col text-left font-semibold'>
                <h5 className='text-gray-800 mb-3 text-2xl'>Learn</h5>
                <ul className='text-gray-500 p-0'>
                    <li className='my-2 hover:text-blue-800 cursor-pointer transition-all'>
                        <a
                            className='text-inherit'
                            style={{ textDecoration: 'none' }}
                            href='/'
                        >
                            <span className='text-inherit'>Home</span>
                        </a>
                    </li>
                    <li className='my-2 hover:text-blue-800 cursor-pointer transition-all'>
                        <a
                            className='text-inherit'
                            style={{ textDecoration: 'none' }}
                            href='/Learn'
                        >
                            <span className='text-inherit'>Algorithms</span>
                        </a>
                    </li>
                    <li className='my-2 hover:text-blue-800 cursor-pointer transition-all'>
                        <a
                            className='text-inherit'
                            style={{ textDecoration: 'none' }}
                            href='/#aboutUs'
                        >
                            <span className='text-inherit'>About Us</span>
                        </a>
                    </li>
                    <li className='my-2 hover:text-blue-800 cursor-pointer transition-all'>
                        <a
                            className='text-inherit'
                            style={{ textDecoration: 'none' }}
                            href='/#services'
                        >
                            <span className='text-inherit'>Services</span>
                        </a>
                    </li>
                    <li className='my-2 hover:text-blue-800 cursor-pointer transition-all'>
                        <a
                            className='text-inherit'
                            style={{ textDecoration: 'none' }}
                            href='/#pricing'
                        >
                            <span className='text-inherit'>Pricing</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className='row-span-2 sm:col-span-2 sm:col-start-11 sm:col-end-13 flex flex-col text-left font-semibold'>
                <h5 className='text-gray-800 mb-3 text-2xl'>Account</h5>
                <ul className='text-gray-500 p-0'>
                    <li className='my-2 hover:text-blue-800 cursor-pointer transition-all'>
                        <a
                            className='text-inherit'
                            style={{ textDecoration: 'none' }}
                            href='/Login'
                        >
                            <span className='text-inherit'>Login</span>
                        </a>
                    </li>
                    <li className='my-2 hover:text-blue-800 cursor-pointer transition-all'>
                        <a
                            className='text-inherit'
                            style={{ textDecoration: 'none' }}
                            href='/CreateAccount'
                        >
                            <span className='text-inherit'>Create Account</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
)

export default Footer2
