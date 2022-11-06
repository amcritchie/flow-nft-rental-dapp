import { useState } from "react";

const NewListing = () => {
  // const [rentalFeeFlow, setRentalFeeFlow] = useState(0.0);
  // const [rentalCollateralFlow, setRentalCollateralFlow] = useState(0.0);
  const [rentalFeeFlow, setRentalFeeFlow] = useState(5.0);
  const [rentalCollateralFlow, setRentalCollateralFlow] = useState(50.0);
  const [rentalNotes, setRentalNotes] = useState("");
  const [rentalLengthHours, setRentalLengthHours] = useState("144"); // 6 Days

  return (
    <div id="newListing">
      <h2>Add a New NFT Listing</h2>
      <form>
        <label>Rental Fee:</label>
        <input
          type="text"
          required
          value={rentalFeeFlow}
          onChange={(e) => setRentalFeeFlow(e.target.value)}
        />
        <label>Collateral Required:</label>
        <input
          type="text"
          required
          value={rentalCollateralFlow}
          onChange={(e) => setRentalCollateralFlow(e.target.value)}
        />
        <label>Notes:</label>
        <textarea
          required
          value={rentalNotes}
          onChange={(e) => setRentalNotes(e.target.value)}
        ></textarea>
        <label>Rental Length:</label>
        <select
        value={rentalLengthHours}
        onChange={(e) => setRentalLengthHours(e.target.value)}
        >
          <option value="144">6 Days</option>
          <option value="240">10 Days</option>
          <option value="312">13 Days</option>
        </select>
        <button>Add Listing</button>
        <p>| {rentalFeeFlow} | {rentalCollateralFlow} | {rentalNotes} | {rentalFeeFlow} |</p>
      </form>
    </div>
  )
