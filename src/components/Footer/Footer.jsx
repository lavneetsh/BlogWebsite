import React from 'react'
import { Link } from 'react-router-dom'
// Corrected the path to go up one level to the main 'components' directory
// where Logo and Container are exported from, likely via an index.js file.
import { Logo, Container } from '../index'

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <section className="relative overflow-hidden py-10 bg-slate-800 border-t border-slate-700">
        <Container>
            <div className="-m-6 flex flex-wrap">
                <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                    <div className="flex h-full flex-col justify-between">
                        <div className="mb-4 inline-flex items-center">
                            {/* Assuming your Logo component is designed to work on a dark background */}
                            <Logo width="100px" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-400">
                                &copy; Copyright {currentYear}. All Rights Reserved by ShareThoughts.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                    <div className="h-full">
                        <h3 className="tracking-px mb-6 text-xs font-semibold uppercase text-slate-500">
                            Company
                        </h3>
                        <ul>
                            <li className="mb-4">
                                <Link className="text-base font-medium text-slate-300 hover:text-white" to="/">
                                    Features
                                </Link>
                            </li>
                            <li className="mb-4">
                                <Link className="text-base font-medium text-slate-300 hover:text-white" to="/">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link className="text-base font-medium text-slate-300 hover:text-white" to="/">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                    <div className="h-full">
                        <h3 className="tracking-px mb-6 text-xs font-semibold uppercase text-slate-500">
                            Support
                        </h3>
                        <ul>
                            <li className="mb-4">
                                <Link className="text-base font-medium text-slate-300 hover:text-white" to="/">
                                    Account
                                </Link>
                            </li>
                            <li className="mb-4">
                                <Link className="text-base font-medium text-slate-300 hover:text-white" to="/">
                                    Help
                                </Link>
                            </li>
                            <li>
                                <Link className="text-base font-medium text-slate-300 hover:text-white" to="/">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="w-full p-6 md:w-1/2 lg:w-3/12">
                    <div className="h-full">
                        <h3 className="tracking-px mb-6 text-xs font-semibold uppercase text-slate-500">
                            Legals
                        </h3>
                        <ul>
                            <li className="mb-4">
                                <Link className="text-base font-medium text-slate-300 hover:text-white" to="/">
                                    Terms &amp; Conditions
                                </Link>
                            </li>
                            <li>
                                <Link className="text-base font-medium text-slate-300 hover:text-white" to="/">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </Container>
    </section>
  )
}

export default Footer;