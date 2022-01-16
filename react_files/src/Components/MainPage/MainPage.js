import { useRef, useState, useCallback } from 'react'
import titleImage from '../../Images/group-selfie-happy-fair.svg'
import aboutUs from '../../Images/group-sharing-fun.svg'
import logo1 from '../../Images/fair_ICON.svg'
import logo2 from '../../Images/team_ICON.svg'
import logo3 from '../../Images/check_ICON.svg'
import logo4 from '../../Images/house_ICON.svg'
import logo5 from '../../Images/jewelry_ICON.svg'
import logo6 from '../../Images/divorce-assets-finance_ICON.svg'
import logoStep1 from '../../Images/Information-Entry-step1_ICON.svg'
import logoStep2 from '../../Images/Allocation-step4_ICON.svg'
import logoStep3 from '../../Images/Values-step3_ICON.svg'
import logoStep4 from '../../Images/Questions-step2_ICON.svg'
import { Link } from 'react-router-dom'
import { useFirestore } from 'react-redux-firebase'

const MainPage = () => {
    const firestore = useFirestore()
    const [interest, setInterest] = useState(false)

    const registerInterest = useCallback(async () => {
        await firestore.add(
            { collection: 'PaymentInterest' },
            {
                interest: true,
                at: new Date().toString(),
            }
        )
        setInterest(true)
        console.log('done')
    }, [])

    const services = useRef(null)
    const about = useRef(null)

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
                                <button
                                    className='py-3 lg:py-4 px-6 lg:px-10 text-bBlue font-bold rounded-lg bg-bWhite hover:bg-bBlue hover:text-white duration-300'
                                    onClick={() =>
                                        services.current.scrollIntoView({
                                            behavior: 'smooth',
                                        })
                                    }
                                >
                                    Get Started
                                </button>
                                <button
                                    className='mt-2 lg:mt-0 xs:ml-4 py-3 lg:py-4 px-8 lg:px-10 text-white font-bold rounded-lg bg-bBlue hover:bg-bBlueDark duration-300'
                                    onClick={() =>
                                        about.current.scrollIntoView({
                                            behavior: 'smooth',
                                        })
                                    }
                                >
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
            <section className='bg-white lg:py-10' ref={about} id='aboutUs'>
                <div className='max-w-screen-xl px-6 md:px-8 xl:px-16 mt-6 mb-6 sm:mt-12 sm:mb-12 mx-auto'>
                    <div className='grid grid-flow-row md:grid-flow-col md:grid-rows-1 sm:grid-cols-2 gap-7 lg:gap-8 py-10 sm:py-20'>
                        <div className='w-full'>
                            {!titleImage ? (
                                <div className='pt-56 block box-border'></div>
                            ) : (
                                <img src={aboutUs} alt='group-sharing-fun' />
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
                <div className='max-w-screen-sm xl:max-w-screen-xl mx-auto px-4 py-12 sm:py-16 md:py-20 xl:py-28'>
                    <div>
                        <h2 className='text-3xl md:text-4xl font-semibold text-gray-800'>
                            Key Features
                        </h2>
                    </div>
                    <div className='mt-10 lg:mt-16 grid xl:grid-cols-3 gap-6 lg:gap-10'>
                        <div className='bg-bWhite p-6 rounded-lg space-y-6 shadow-md hover:shadow-xl duration-200'>
                            <div className='flex items-center justify-center'>
                                <img
                                    src={logo1}
                                    alt='icon-fair-division'
                                    style={{
                                        width: '125px',
                                        height: '125px',
                                    }}
                                />
                            </div>
                            <div className='space-y-4'>
                                <h4 className='text-2xl md:text-3xl font-semibold text-green-400'>
                                    Fair
                                </h4>
                                <p className='text-gray-700'>
                                    Our algorithms results in mathematically
                                    proven envy-free solutions.
                                </p>
                            </div>
                        </div>
                        <div className='bg-bWhite p-6 rounded-lg space-y-6 shadow-md hover:shadow-xl duration-200'>
                            <div className='flex items-center justify-center'>
                                <img
                                    src={logo2}
                                    alt='icon-team-diverse'
                                    style={{
                                        width: '125px',
                                        height: '125px',
                                    }}
                                />
                            </div>
                            <div className='space-y-4'>
                                <h4 className='text-2xl md:text-3xl font-semibold text-green-400'>
                                    Convenient
                                </h4>
                                <p className='text-gray-700'>
                                    You can share with a remote group or by
                                    using a local device.
                                </p>
                            </div>
                        </div>
                        <div className='bg-bWhite p-6 rounded-lg space-y-6 shadow-md hover:shadow-xl duration-200'>
                            <div className='flex items-center justify-center'>
                                <img
                                    src={logo3}
                                    alt='icon-happy-star'
                                    style={{
                                        width: '125px',
                                        height: '125px',
                                    }}
                                />
                            </div>
                            <div className='space-y-4'>
                                <h4 className='text-2xl md:text-3xl font-semibold text-green-400'>
                                    Easy
                                </h4>
                                <p className='text-gray-700'>
                                    Our service is as quick and straightforward
                                    to use as possible.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='bg-white'>
                <div className='max-w-screen-lg mx-auto px-3 py-16'>
                    <div className='text-center'>
                        <h2 className='text-xl md:text-2xl font-normal text-gray-800'>
                            How does it work?
                        </h2>
                        <h1 className='text-4xl md:text-5xl font-semibold text-green-400'>
                            Simple
                        </h1>
                    </div>
                    <hr />
                    <div className='mt-10 lg:mt-16 grid grid-flow-row sm:grid-cols-2 md:gap-8'>
                        <div className='flex flex-col items-center justify-center w-full text-center sm:px-6'>
                            <h3 className='text-2xl md:text-3xl text-gray-800 font-semibold'>
                                1. Enter Goods Info
                            </h3>
                            <p className='mt-2 m-0 text-gray-700'>
                                We need info about the goods you want to share.
                                This could be the goods names, or just tell us
                                how many rooms you are splitting.
                            </p>
                        </div>
                        <div className='w-full p-6 '>
                            <img src={logoStep1} alt='icon good info entry' />
                        </div>
                    </div>
                    <div className='mt-10 lg:mt-16 grid grid-flow-row sm:grid-cols-2 md:gap-8'>
                        <div className='flex flex-col items-center justify-center w-full text-center sm:px-6 sm:order-2'>
                            <h3 className='text-2xl md:text-3xl text-gray-800 font-semibold'>
                                2. Create a Group
                            </h3>
                            <p className='mt-2 m-0 text-gray-700'>
                                Tell us who you plan to share the goods with.
                                Simply enter their names, or if sharing
                                remotely, invite registered users.
                            </p>
                        </div>
                        <div className='w-full p-6 '>
                            <img src={logoStep2} alt='icon good info entry' />
                        </div>
                    </div>
                    <div className='mt-10 lg:mt-16 grid grid-flow-row sm:grid-cols-2 md:gap-8'>
                        <div className='flex flex-col items-center justify-center w-full text-center sm:px-6'>
                            <h3 className='text-2xl md:text-3xl text-gray-800 font-semibold'>
                                3. Give your valuations.
                            </h3>
                            <p className='mt-2 m-0 text-gray-700'>
                                Enter each person's valuation for each item.
                                When sharing remotely, each user will give their
                                own valuations.
                            </p>
                        </div>
                        <div className='w-full p-6 '>
                            <img src={logoStep3} alt='icon good info entry' />
                        </div>
                    </div>
                    <div className='mt-10 lg:mt-16 grid grid-flow-row sm:grid-cols-2 md:gap-8'>
                        <div className='flex flex-col items-center justify-center w-full text-center sm:px-6 sm:order-2'>
                            <h3 className='text-2xl md:text-3xl text-gray-800 font-semibold'>
                                4. See Who Gets What.
                            </h3>
                            <p className='mt-2 m-0 text-gray-700'>
                                Our algorithms will use everybody's values to
                                compute a fair allocation.
                            </p>
                        </div>
                        <div className='w-full p-6 '>
                            <img src={logoStep4} alt='icon good info entry' />
                        </div>
                    </div>
                </div>
            </section>

            <section className='bg-bBgBlue' ref={services} id='services'>
                <div className='max-w-screen-md lg:max-w-screen-xl mx-auto px-3 py-16 lg:py-24'>
                    <div className='text-center'>
                        <h1 className='text-3xl md:text-4xl font-semibold text-white'>
                            We Can Help You
                        </h1>
                        <div className='mt-10 lg:mt-16 grid grid-flow-row lg:grid-cols-3 md:gap-2'>
                            <div className='p-6'>
                                <div className='flex items-center justify-center'>
                                    <img
                                        src={logo4}
                                        alt='icon-house-rent'
                                        style={{
                                            width: '125px',
                                            height: '125px',
                                        }}
                                    />
                                </div>
                                <h2 className='text-white font-light text-4xl xl:text-5xl'>
                                    Share Rent
                                </h2>
                                <p className='mt-2 text-white m-0'>
                                    Renting an apartment with your friends can
                                    be tricky. How do you decide who gets what
                                    room without anyone feeling upset. Our
                                    algorithms use your values for each room to
                                    give you a mathematically fair allocation.
                                </p>
                                <Link
                                    style={{ textDecoration: 'none' }}
                                    to='/Distribute/localremote/Rent'
                                >
                                    <button className='mt-3 py-2 px-3 lg:px-10 text-bBlue font-bold rounded-lg bg-bWhite hover:bg-bBlue hover:text-white duration-300'>
                                        Start
                                    </button>
                                </Link>
                            </div>
                            <div className='p-6'>
                                <div className='flex items-center justify-center'>
                                    <img
                                        src={logo5}
                                        alt='icon-divisible-goods'
                                        style={{
                                            width: '125px',
                                            height: '125px',
                                        }}
                                    />
                                </div>
                                <h2 className='text-white font-light text-4xl xl:text-5xl'>
                                    Share Goods
                                </h2>
                                <p className='mt-2 text-white m-0'>
                                    Share any type of good such as jewelry,
                                    financial assets, or real estate. Simply
                                    enter the details of each good. By assigning
                                    a monetary valuation for each good, we give
                                    you a envy-free allocation that maximizes
                                    the sum of bids.
                                </p>
                                <Link
                                    style={{ textDecoration: 'none' }}
                                    to='/Distribute/localremote/Goods'
                                >
                                    <button className='mt-3 py-2 px-3 lg:px-10 text-bBlue font-bold rounded-lg bg-bWhite hover:bg-bBlue hover:text-white duration-300'>
                                        Start
                                    </button>
                                </Link>
                            </div>
                            <div className='p-6'>
                                <div className='flex items-center justify-center'>
                                    <img
                                        src={logo6}
                                        alt='icon-house-rent'
                                        style={{
                                            width: '125px',
                                            height: '125px',
                                        }}
                                    />
                                </div>
                                <h2 className='text-white font-light text-4xl xl:text-5xl'>
                                    Separate Finances
                                </h2>
                                <p className='mt-2 text-white m-0'>
                                    When you divorce or end a civil partnership,
                                    separating your money and property is very
                                    tricky. Our service can help start things
                                    off by giving you a fair distribution of
                                    assets based on which goods you value. And
                                    this isn't limited to finances.
                                </p>
                                <Link
                                    style={{ textDecoration: 'none' }}
                                    to='/Distribute/localremote/Divorce'
                                >
                                    <button className='mt-3 py-2 px-3 lg:px-10 text-bBlue font-bold rounded-lg bg-bWhite hover:bg-bBlue hover:text-white duration-300'>
                                        Start
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section
                className='bg-gradient-to-b from-gray-100 to-white'
                id='pricing'
            >
                <div className='max-w-screen-sm md:max-w-screen-xl mx-auto px-6 md:px-2 lg:px-8 py-16 pb-28'>
                    <h1 className='text-3xl md:text-4xl font-semibold text-gray-800'>
                        Choose Your Plan
                    </h1>
                    <p>
                        We have a variety of packages that are tailored for each
                        individual's needs.
                    </p>
                    <div className='mt-10 lg:mt-16 grid grid-flow-row md:grid-cols-3 gap-5 md:gap-2 xl:gap-8'>
                        <div className='bg-white py-16 px-6 lg:px-10 shadow-md rounded-lg text-left border-t-4 border-white hover:shadow-lg duration-200'>
                            <div className='flex flex-col h-100'>
                                <h5 className='text-green-400 font-bold'>
                                    Free Plan
                                </h5>
                                <h4 className='mt-3 text-gray-700 text-5xl'>
                                    <sup className='text-3xl'>$</sup>0
                                    <span className='text-lg'>per month</span>
                                </h4>
                                <ul className='text-gray-500 list-disc list-outside text-left mt-3'>
                                    <li className='py-1'>
                                        Use our algorithms to share rent, share
                                        goods, and separate finances locally
                                    </li>
                                    <li className='py-1'>
                                        Share with up to <b>2</b> other people
                                    </li>
                                    <li className='py-1'>
                                        Share sessions a month: <b>5</b>
                                    </li>
                                </ul>
                                <div className='flex flex-col flex-grow align-bottom'>
                                    <Link
                                        style={{ textDecoration: 'none' }}
                                        to='/CreateAccount'
                                        className='mt-auto mr-auto'
                                    >
                                        <button className='mt-2 lg:mt-0 py-2 lg:py-4 px-3 lg:px-8 text-white font-bold rounded-lg bg-bBlue hover:bg-bBlueDark duration-300'>
                                            Create Account
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white py-16 px-6 lg:px-10 shadow-md rounded-lg text-left border-t-4 border-green-400 hover:shadow-lg duration-200'>
                            <div className='flex flex-col h-100'>
                                <h5 className='text-green-400 font-bold'>
                                    Premium Plan
                                </h5>
                                <h4 className='mt-3 text-gray-700 text-5xl'>
                                    <sup className='text-3xl'>$</sup>5
                                    <span className='text-lg'>per month</span>
                                </h4>
                                <ul className='text-gray-500 list-disc list-outside text-left mt-3'>
                                    <li className='py-1'>
                                        Use our algorithms to share rent, share
                                        goods, and separate finances locally
                                    </li>
                                    <li className='py-1'>
                                        Share with up to <b>5</b> other people
                                    </li>
                                    <li className='py-1'>
                                        Share sessions a month: <b>100</b>
                                    </li>
                                    <li className='py-1'>
                                        Easily share remotely by inviting other
                                        accounts to your sharing sessions
                                    </li>
                                    <li className='py-1'>
                                        View all your past allocations in your
                                        account page
                                    </li>
                                </ul>
                                <div className='flex flex-col flex-grow align-bottom'>
                                    <div className='mt-auto'>
                                        {!interest ? (
                                            <button
                                                className='mt-2 lg:mt-0 py-2 lg:py-4 px-3 lg:px-8 text-white font-bold rounded-lg bg-bBlue hover:bg-bBlueDark duration-300'
                                                onClick={registerInterest}
                                            >
                                                Register Interest
                                            </button>
                                        ) : (
                                            <h5
                                                className='mt-3'
                                                style={{
                                                    display: 'inline-block',
                                                }}
                                            >
                                                Done
                                            </h5>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white py-16 px-6 lg:px-10 shadow-md rounded-lg text-left border-t-4 border-white hover:shadow-lg duration-200'>
                            <div className='flex flex-col h-100'>
                                <h5 className='text-green-400 font-bold'>
                                    Enthusiast Plan
                                </h5>
                                <h4 className='mt-3 text-gray-700 text-5xl'>
                                    <sup className='text-3xl'>$</sup>10
                                    <span className='text-lg'>per month</span>
                                </h4>
                                <ul className='text-gray-500 list-disc list-outside text-left mt-3'>
                                    <li className='py-1'>
                                        Use our algorithms to share rent, share
                                        goods, and separate finances locally
                                    </li>
                                    <li className='py-1'>
                                        Share with up to <b>99</b> other people
                                    </li>
                                    <li className='py-1'>
                                        Share sessions a month: <b>Unlimited</b>
                                    </li>
                                    <li className='py-1'>
                                        Easily share remotely by inviting other
                                        accounts to your sharing sessions
                                    </li>
                                    <li className='py-1'>
                                        View all your past allocations in your
                                        account page
                                    </li>
                                    <li className='py-1'>
                                        Personal access to the API that powers
                                        our service.
                                    </li>
                                    <li className='py-1'>
                                        Be the first to use new algorithms and
                                        features
                                    </li>
                                </ul>
                                <div className='flex flex-col flex-grow align-bottom'>
                                    <div className='mt-auto'>
                                        {!interest ? (
                                            <button
                                                className='mt-2 lg:mt-0 py-2 lg:py-4 px-3  lg:px-8 text-white font-bold rounded-lg bg-bBlue hover:bg-bBlueDark duration-300'
                                                onClick={registerInterest}
                                            >
                                                Register Interest
                                            </button>
                                        ) : (
                                            <h5
                                                className='mt-3'
                                                style={{
                                                    display: 'inline-block',
                                                }}
                                            >
                                                Done
                                            </h5>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='bg-green-400'>
                <div className='flex flex-col justify-center align-middle px-3 py-10 md:py-14'>
                    <h3 className='text-xl md:text-2xl font-normal text-gray-800'>
                        Want to learn more about the underlying algorithms?
                    </h3>
                    <div>
                        <a href='/Learn' style={{ textDecoration: 'none' }}>
                            <h1 className='text-2xl md:text-4xl font-bold text-gray-800 hover:text-black underline'>
                                Go to our learning page.
                            </h1>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default MainPage
