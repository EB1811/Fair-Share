const Footer2 = () => (
    <div className='bg-neutral-800 pt-16 pb-10 lg:pt-44 lg:pb-32'>
        <div className='max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-16 grid grid-rows-4 sm:grid-rows-1 grid-flow-row sm:grid-flow-col grid-cols-3 sm:grid-cols-12 gap-4'>
            <div className='mb-10 sm:mb-0 row-span-2 sm:col-span-4 col-start-1 col-end-4 sm:col-end-5 flex flex-col items-start text-left'>
                <span className='font-bold text-3xl text-white'>
                    Split
                    <span style={{ color: '#0555b6' }}>Sum</span>
                </span>
                <p className='mt-4 text-gray-50'>
                    Our service helps you solve day-to-day sharing problems
                    using mathematical algorithms that achieve fair results.
                </p>
                <p className='mt-4 m-0 text-gray-400'>
                    Designed and Built by Emmanuil B.
                </p>
                <a href='https://eb1811.github.io/'>
                    <p className=' text-gray-400 underline hover:text-gray-100'>
                        eb1811.github.io
                    </p>
                </a>
            </div>
            <div className='row-span-2 sm:col-span-2 sm:col-start-7 sm:col-end-9 flex flex-col text-left font-semibold'>
                <h5 className='text-gray-100 mb-3 text-2xl'>Share</h5>
                <ul className='text-gray-400 p-0'>
                    <li className='my-2'>
                        <a
                            className='text-inherit'
                            style={{ textDecoration: 'none' }}
                            href='/Distribute/localremote/Rent'
                        >
                            <span className='text-inherit hover:text-blue-600 cursor-pointer transition-all'>
                                Rent
                            </span>
                        </a>
                    </li>
                    <li className='my-2'>
                        <a
                            className='text-inherit'
                            style={{ textDecoration: 'none' }}
                            href='/Distribute/localremote/Goods'
                        >
                            <span className='text-inherit hover:text-blue-600 cursor-pointer transition-all'>
                                Goods
                            </span>
                        </a>
                    </li>
                    <li className='my-2'>
                        <a
                            className='text-inherit'
                            style={{ textDecoration: 'none' }}
                            href='/Distribute/localremote/Divorce'
                        >
                            <span className='text-inherit hover:text-blue-600 cursor-pointer transition-all'>
                                Finances
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className='row-span-2 sm:col-span-2 sm:col-start-9 sm:col-end-11 flex flex-col text-left font-semibold'>
                <h5 className='text-gray-100 mb-3 text-2xl'>Learn</h5>
                <ul className='text-gray-400 p-0'>
                    <li className='my-2'>
                        <a
                            className='text-inherit'
                            style={{ textDecoration: 'none' }}
                            href='/'
                        >
                            <span className='text-inherit hover:text-blue-600 cursor-pointer transition-all'>
                                Home
                            </span>
                        </a>
                    </li>
                    <li className='my-2'>
                        <a
                            className='text-inherit'
                            style={{ textDecoration: 'none' }}
                            href='/Learn'
                        >
                            <span className='text-inherit hover:text-blue-600 cursor-pointer transition-all'>
                                Algorithms
                            </span>
                        </a>
                    </li>
                    <li className='my-2'>
                        <a
                            className='text-inherit'
                            style={{ textDecoration: 'none' }}
                            href='/#aboutUs'
                        >
                            <span className='text-inherit hover:text-blue-600 cursor-pointer transition-all'>
                                About Us
                            </span>
                        </a>
                    </li>
                    <li className='my-2'>
                        <a
                            className='text-inherit'
                            style={{ textDecoration: 'none' }}
                            href='/#services'
                        >
                            <span className='text-inherit hover:text-blue-600 cursor-pointer transition-all'>
                                Services
                            </span>
                        </a>
                    </li>
                    <li className='my-2'>
                        <a
                            className='text-inherit'
                            style={{ textDecoration: 'none' }}
                            href='/#pricing'
                        >
                            <span className='text-inherit hover:text-blue-600 cursor-pointer transition-all'>
                                Pricing
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className='row-span-2 sm:col-span-2 sm:col-start-11 sm:col-end-13 flex flex-col text-left font-semibold'>
                <h5 className='text-gray-100 mb-3 text-2xl'>Account</h5>
                <ul className='text-gray-400 p-0'>
                    <li className='my-2'>
                        <a
                            className='text-inherit'
                            style={{ textDecoration: 'none' }}
                            href='/Login'
                        >
                            <span className='text-inherit hover:text-blue-600 cursor-pointer transition-all'>
                                Login
                            </span>
                        </a>
                    </li>
                    <li className='my-2'>
                        <a
                            className='text-inherit'
                            style={{ textDecoration: 'none' }}
                            href='/CreateAccount'
                        >
                            <span className='text-inherit hover:text-blue-600 cursor-pointer transition-all'>
                                Create Account
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
)

export default Footer2
