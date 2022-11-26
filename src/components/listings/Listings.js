import { useState, useEffect } from 'react';

import flowLogo from '../../assets/flowLogo.png';
import rookieYear from '../../assets/rookieYear.svg';
import championshipYear from '../../assets/championshipYear.svg';
import playerNumber from '../../assets/playerNumber.svg';
import firstSerial from '../../assets/firstSerial.svg';
import rookieMint from '../../assets/rookieMint.svg';
import allDayDebut from '../../assets/allDayDebut.svg';

const Listings = ({ listings, title, handleRentListing, handleDeleteListing}) => {

    // Badges and their image.
    const [badges, setBadges] = useState({
        rookieYear: rookieYear,
        championshipYear: championshipYear,
        playerNumber: playerNumber,
        firstSerial: firstSerial,
        rookieMint: rookieMint,
        allDayDebut: allDayDebut,
    });

    return (
        <div className="listings">
            <h2>{title}</h2>
            {listings.map((listing) => (
            <div className="flex p-6 font-mono">
                <div className="flex-none w-48 mb-10 relative z-10 before:absolute before:top-1 before:left-1 before:w-full before:h-full before:bg-teal-400">
                <img src={listing.imageUrl} alt="" className="absolute z-10 inset-0 w-full h-full object-cover rounded-lg" loading="lazy" />
                </div>
                <form className="flex-auto pl-6">
                <div className="relative flex flex-wrap items-baseline pb-6 before:bg-black before:absolute before:-top-6 before:bottom-0 before:-left-60 before:-right-6">
                    <h1 className="relative w-full flex-none mb-2 text-2xl font-semibold text-white">
                        {listing.name}
                        {listing.badges.map((badge) => (
                            <img src={badges[badge]} className="inline h-6 w-6 ml-1" alt="logo" />
                        ))}
                    </h1>
                    <div className="relative flex items-center text-lg text-white">
                        Rent: {listing.rentalFeeFlow} 
                        <img src={flowLogo} className="h-4 w-4 ml-1" alt="logo" />
                    </div>
                    <div className="relative flex items-center uppercase text-teal-400 ml-3">
                        Collateral: {listing.rentalCollateralFlow}
                        <img src={flowLogo} className="h-4 w-4 ml-1" alt="logo" />
                    </div>
                </div>
                <div className="flex items-baseline my-6">
                    <div className="space-x-3 flex text-sm font-medium">
                    <label>
                        <input className="sr-only peer" name="size" type="radio" value="xs" defaultChecked />
                        <div className="relative w-10 h-10 flex items-center justify-center text-black peer-checked:bg-black peer-checked:text-white before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full peer-checked:before:bg-teal-400">
                        XS
                        </div>
                    </label>
                    <label>
                        <input className="sr-only peer" name="size" type="radio" value="s" />
                        <div className="relative w-10 h-10 flex items-center justify-center text-black peer-checked:bg-black peer-checked:text-white before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full peer-checked:before:bg-teal-400">
                        S
                        </div>
                    </label>
                    <label>
                        <input className="sr-only peer" name="size" type="radio" value="m" />
                        <div className="relative w-10 h-10 flex items-center justify-center text-black peer-checked:bg-black peer-checked:text-white before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full peer-checked:before:bg-teal-400">
                        M
                        </div>
                    </label>
                    <label>
                        <input className="sr-only peer" name="size" type="radio" value="l" />
                        <div className="relative w-10 h-10 flex items-center justify-center text-black peer-checked:bg-black peer-checked:text-white before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full peer-checked:before:bg-teal-400">
                        L
                        </div>
                    </label>
                    <label>
                        <input className="sr-only peer" name="size" type="radio" value="xl" />
                        <div className="relative w-10 h-10 flex items-center justify-center text-black peer-checked:bg-black peer-checked:text-white before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full peer-checked:before:bg-teal-400">
                        XL
                        </div>
                    </label>
                    </div>
                </div>
                <div className="flex space-x-2 mb-4 text-sm font-medium">
                    <div className="flex space-x-4">
                    <button 
                    onClick={() => handleRentListing(listing.nftSerial)}
                    type="submit"
                    className="px-6 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-teal-400 text-black"
                    >
                        Rent Listing
                    </button>
                    <button 
                    onClick={() => handleDeleteListing(listing.nftSerial)}
                    type="button"
                    className="px-6 h-12 uppercase font-semibold tracking-wider border border-slate-200 text-slate-900"
                    >
                        Delete Listing
                    </button>
                    </div>
                    <button className="flex-none flex items-center justify-center w-12 h-12 text-black" type="button" aria-label="Like">
                    <svg width="20" height="20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" clipRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                    </svg>
                    </button>
                </div>
                <p className="text-xs leading-6 text-slate-500">
                    Free shipping on all continental US orders.
                </p>
                </form>
            </div>
            ))}
        </div>
    )

    return ( 
        <div className="listings">
            <h2>{title}</h2>
            {listings.map((listing) => (
                <div className="listing-preview" key={listing.nftSerial} >
                    <h2>{listing.name}</h2>
                    <button onClick={() => handleDeleteListing(listing.nftSerial)}>Delete Listing</button>
                </div>
            ))}
        </div>
     );

    // return ( 
    //     <div className="listings">
    //         <h2>{title}</h2>
    //         {listings.map((listing) => (
    //             <div className="listing-preview" key={listing.nftSerial} >
    //                 <h2>{listing.name}</h2>
    //                 <button onClick={() => handleDeleteListing(listing.nftSerial)}>Delete Listing</button>
    //             </div>
    //         ))}
    //     </div>
    //  );

}
 
export default Listings;