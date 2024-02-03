import { useState } from "react";
import Web3 from "web3";

export default function MyPage() {
  const [address, setAddress] = useState("");
  const [value, setValue] = useState("");
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
      }
    });
  }

  return (
    <div style={{ backgroundColor: "#f5f5f5", padding: "20px" }}>
      <h1 style={{ color: "#333" }}>Connect Wallet</h1>
      <button
        onClick={connectWallet}
        style={{
          backgroundColor: "#0070f3",
          color: "#fff",
          padding: "8px 16px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Connect Wallet
      </button>
      {address && <p style={{ color: "#333" }}>Address: {address}</p>}
      {address && (
        <div>
          <label htmlFor="value" style={{ color: "#333" }}>
            Value:
          </label>
          <input
            type="text"
            id="value"
            value={value}
            onChange={handleValueChange}
            style={{
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <button
            onClick={sendTransaction}
            style={{
              backgroundColor: "#0070f3",
              color: "#fff",
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginLeft: "8px",
            }}
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
}

// // CSS
// .wrapper {
//   background-color: #ff00ff;
//   background-image: url('https://wallpapers-hub.art/wallpaper-images/51724.jpg');
//   background-size: cover;
//   background-position: center;
//   height: 100vh;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   color: white;
//   font-family: Arial, sans-serif;
// }

// h1 {
//   font-size: 3rem;
// }

// button {
//   margin-top: 1rem;
//   padding: 0.5rem 1rem;
//   border-radius: 0.25rem;
//   border: none;
//   background-color: #0080ff;
//   color: white;
//   font-size: 1.25rem;
//   cursor: pointer;
// }

// button:hover {
//   background-color: #0059b3;
// }

// label {
//   display: block;
//   margin-top: 1rem;
//   font-size: 1.5rem;
// }

// input[type="text"] {
//   padding: 0.5rem;
//   font-size: 1.5rem;
//   border-radius: 0.25rem;
//   border: none;
// }

// button:disabled {
//   background-color: gray;
//   cursor: not-allowed;
// }
