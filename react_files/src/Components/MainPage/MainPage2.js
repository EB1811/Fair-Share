import titleImage from '../../Images/group-selfie-happy-fair.svg'

const MainPage2 = () => {
    return (
        <div className='min-h-screen bg-white'>
            <section className='bg-bBgBlue lg:py-10'>
                <div className='max-w-screen-2xl px-6 md:px-8 xl:px-16 mx-auto'>
                    <div className='grid grid-flow-row md:grid-flow-col md:grid-rows-1 sm:grid-cols-2 gap-2 lg:gap-8 py-10 sm:py-20'>
                        <div className='flex flex-col justify-center items-start row-start-2 sm:row-start-1 text-left'>
                            <h1 className='text-3xl justify-center xl:text-5xl font-bold text-white'>
                                Split Goods Without Envy
                            </h1>
                            <p className='text-gray-100 lg:mt-2 text-sm md:text-lg'>
                                Our service helps you solve day-to-day sharing
                                problems using mathematical algorithms that
                                achieve fair results.
                            </p>
                            <div className='w-100 lg:mt-12'>
                                <button className='py-3 lg:py-4 px-6 lg:px-10 text-bBlue font-bold rounded-lg bg-bWhite hover:bg-bBlue hover:text-white duration-300'>
                                    Get Started
                                </button>
                                <button className='mt-2 lg:mt-0 xs:ml-4 py-3 lg:py-4 px-8 lg:px-10 text-white font-bold rounded-lg bg-bBlue hover:bg-bBlueDark duration-300'>
                                    About Us
                                </button>
                            </div>
                        </div>
                        <div className='w-full'>
                            {!titleImage ? (
                                <div className='pt-56 block box-border'></div>
                            ) : (
                                <img
                                    src={titleImage}
                                    alt='group-selfie-happy-fair'
                                />
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <section className='bg-white lg:py-10'>
                <div className='max-w-screen-xl px-6 md:px-8 xl:px-16 mt-6 mb-6 sm:mt-12 sm:mb-12 mx-auto'>
                    <div className='grid grid-flow-row md:grid-flow-col md:grid-rows-1 sm:grid-cols-2 gap-7 lg:gap-8 py-10 sm:py-20'>
                        <div className='w-full'>
                            {!titleImage ? (
                                <div className='pt-56 block box-border'></div>
                            ) : (
                                <img
                                    src={titleImage}
                                    alt='group-selfie-happy-fair'
                                />
                            )}
                        </div>
                        <div className='flex flex-col justify-center items-end ml-auto w-full lg:w-9/12'>
                            <h1 className='text-2xl xl:text-3xl text-left font-normal text-blue-900'>
                                We use <b>Personal</b> Valuations to Compute a{' '}
                                <b>Fair</b> Allocation.
                            </h1>
                            <ul className='text-gray-700 list-disc list-outside text-left mt-3'>
                                <li>
                                    Sharing is done by using fair division and
                                    rental harmony algorithms.
                                </li>
                                <li>
                                    We utilize these algorithms to help people
                                    split items in a way that doesn't cause
                                    resentment.
                                </li>
                                <li>
                                    Users can share rent, share goods, and
                                    separate finances in the event of a divorce.
                                </li>
                                {/* <li>
                                        We are constantly looking for new areas
                                        and problems to apply our algorithms to.
                                    </li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section className='bg-gray-100'>
                <div className='max-w-screen-xl mx-auto px-4 py-12 sm:py-16 md:py-20 xl:py-28'>
                    <div className='space-y-4'>
                        <h2 className='text-3xl md:text-4xl font-semibold text-gray-800'>
                            Key Features
                        </h2>
                    </div>
                    <div className='mt-10 lg:mt-16'></div>
                </div>
            </section>
        </div>
    )
}

export default MainPage2
