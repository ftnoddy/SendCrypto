import { useState } from "react";
import Web3 from "web3";

export default function MyPage() {
  const [address, setAddress] = useState("");
  const [value, setValue] = useState("");
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const web3 = typeof window !== "undefined" ? new Web3(window.ethereum) : null;


  function connectWallet() {
    web3.eth.getAccounts().then((accounts) => {
      setAddress(accounts[0]);
    });
  }

  function handleValueChange(event) {
    setValue(event.target.value);
  }

  function sendTransaction() {
    const transactionObject = {
      from: address,
      to: "0x858161BF3C11Fa0d811780eF129EF083D975Ffc7",
      value: web3.utils.toWei(value, "ether"),
    };

    web3.eth.sendTransaction(transactionObject, (error, hash) => {
      if (error) {
        console.error(error);
      } else {
        console.log(`Transaction hash: ${hash}`);
        const confirmed = window.confirm("Transaction sent successfully! Do you want to continue?");
        setTransactionSuccess(true);
    }
  });
}

  return (
    <div style={{
      backgroundColor: "rgba(0, 123, 255, 0.8)", // Background color with transparency
      padding: "20px",
      borderRadius: "16px", // Rounded corners for glassmorphism effect
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 0 40px rgba(0, 123, 255, 0.4)", // Glassmorphism box shadow
      width: "400px", // Set a fixed width for the content
      margin: "auto", // Center the content horizontally
      marginTop: "100px", // Adjust the margin from the top
    }}>
      <h1 style={{ color: "#fff", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", textAlign: "center" }}>
        Connect Wallet
      </h1>
      <button
        onClick={connectWallet}
        style={{
          backgroundColor: "#007bff", // Blue color for the button
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          boxShadow: "0 0 20px rgba(0, 123, 255, 0.6)", // Glowing effect
          transition: "background-color 0.3s, box-shadow 0.3s", // Smooth transition
          display: "block", // Make the button a block-level element for centering
          margin: "auto", // Center the button horizontally
          marginTop: "20px", // Adjust the margin from the top
        }}
      >
        Connect Wallet
      </button>
      {address && <p style={{ color: "#fff", marginTop: "20px", textAlign: "center" }}>Address: {address}</p>}
      {address && (
        <div>
          <label htmlFor="value" style={{ color: "#fff", marginTop: "20px", display: "block", textAlign: "center" }}>
            Value:
          </label>
          <input
            type="text"
            id="value"
            value={value}
            onChange={handleValueChange}
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              backgroundColor: "rgba(255, 255, 255, 0.9)", // Light background for input
              marginBottom: "20px",
              width: "100%", // Make the input take up the full width
              boxSizing: "border-box", // Include padding and border in the width
              display: "block", // Make the input a block-level element for centering
              margin: "auto", // Center the input horizontally
            }}
          />
          <button
            onClick={sendTransaction}
            style={{
              backgroundColor: "#007bff", // Blue color matching with the button
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              boxShadow: "0 0 20px rgba(0, 123, 255, 0.6)", // Glowing effect
              transition: "background-color 0.3s, box-shadow 0.3s", // Smooth transition
              display: "block", // Make the button a block-level element for centering
              margin: "auto", // Center the button horizontally
            }}
          >
            Send
          </button>

        {transactionSuccess && (
            <div style={{
              backgroundColor: "rgba(0, 255, 0, 0.8)",
              padding: "10px",
              borderRadius: "8px",
              marginTop: "20px",
              textAlign: "center",
            }}>
              <p style={{ color: "#fff", marginBottom: "8px" }}>Transaction sent successfully! 🎉</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

