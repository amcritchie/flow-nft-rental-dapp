import { useState, useEffect } from 'react';
import Listings from '../listings/Listings';

const Home = () => {

    const [listings, setListings] = useState([
        { name: 'Tom Brady', rentalFeeFlow: 5.0, rentalCollateralFlow: 200.0, serial: 3001, nftSerial: 577428, series: "Series 1", set: 'Base', badges: ['debut'], imageUrl: "https://assets.nflallday.com/editions/base/98f4d11a-d28c-43f6-b5b1-27c1fe6c86bf/play_98f4d11a-d28c-43f6-b5b1-27c1fe6c86bf_base_capture_Hero_Trans_2880_2880_Transparent.png" },
        { name: 'Micah Parsons', rentalFeeFlow: 15.0, rentalCollateralFlow: 700.0, serial: 140, nftSerial: 686473, series: "Series 1", set: 'In the Trenches', badges: ['rookie_year', 'minted_rookie_year', 'debut'], imageUrl: "https://assets.nflallday.com/resize/editions/in_the_trenches/ea71ab97-5e26-4369-b609-adfde141d69f/play_ea71ab97-5e26-4369-b609-adfde141d69f_in_the_trenches_capture_Hero_Black_2880_2880_Black.png" },
        { name: 'Patrick Mahomes II', rentalFeeFlow: 35.0, rentalCollateralFlow: 1500.0, serial: 350, nftSerial: 688081, series: "Series 1", set: 'Launch Codes', badges: ['debut'], imageUrl: "https://assets.nflallday.com/editions/launch_codes/64d00c8c-3b4b-42b5-8885-ffc34b615ad3/play_64d00c8c-3b4b-42b5-8885-ffc34b615ad3_launch_codes_capture_Hero_Trans_2880_2880_Transparent.png" }
    ]);

    const handleClick = () => {
        console.log("Click");
    }

    const handleClickAgain = (name) => {
        console.log('Hello ' + name);
    }

    const handleRentListing = (nftSerial) => {

    }

    const handleDeleteListing = (nftSerial) => {
        const newListings = listings.filter(listing => listing.nftSerial !== nftSerial);
        setListings(newListings);
    }


    return ( 
        <div className="home">
            <br />
            <Listings listings={listings} title="Listings" handleRentListing={handleRentListing} handleDeleteListing={handleDeleteListing} />
            <br />
            <Listings listings={listings.filter((listing) => listing.name === 'Micah Parsons') } title="Micah Parson Listings" handleRentListing={handleRentListing} handleDeleteListing={handleDeleteListing} />
            <br />
            <h2>Test Buttons</h2>
            <button onClick={handleClick}>Click Me</button>
            <button onClick={() => handleClickAgain('mario')}>Click Me Again</button>
        </div> 
    );
}
 
export default Home;