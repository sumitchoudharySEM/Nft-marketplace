import "./App.css";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { useEffect, useState } from "react";
import {mintNFT} from "./cadence/transactions/mint_nft.js";
import { create } from "ipfs-http-client";
// const client = create('https://ipfs.infura.io:5001/api/v0');
import { Web3Storage } from 'web3.storage';

// Construct with token and endpoint
const client = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEYzQzZkYWRBNUIwMTZkMjkyNmYwN0VhZTYxODNhNTM2NjE2RjIwZTQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODgxNDg3Mjk5NzUsIm5hbWUiOiJuZnRtYXJrIn0.u2a2AHBeLRCIHLC5ZteMU9-uwBAPLYOW11LpVjUbsDY" });


fcl
  .config()
  .put("accessNode.api", "https://access-testnet.onflow.org")
  .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn");

function App() {
  const [user, setUser] = useState();
  const [NFTName, setNFTName] = useState();
  const [file, setFile] = useState();

  const set_file = () => {
    const fileInput = document.querySelector('input[type="file"]');
    setFile(fileInput.files[0]);
    console.log(file);
  };

  const login = () => {
    fcl.authenticate();
  };

// Pack files into a CAR and send to web3.storage
// const rootCid = await client.put(fileInput.files, {
//   name: 'cat pics',
//   maxRetries: 3,
// });

  const mint = async () => {
    
    try {
      console.log("Uploading file...");
      console.log(file);
      //const added = await client.add(file);
      const rootCid = await client.put(file.files, {
        name: 'cat pics',
        maxRetries: 3,
      });
      console.log("Uploading file... stage2");
      const res = await client.get(rootCid)
      console.log(res)
      //get the hash of the file
      const hash = rootCid;
      //const hash = added.path;
      console.log(hash);
      const transactionID = await fcl
        .send([
          fcl.transaction(mintNFT),
          fcl.args([
            fcl.arg(rootCid, t.String),
            fcl.arg(NFTName, t.String),
          ]),
          fcl.proposer(fcl.authz),
          fcl.payer(fcl.authz),
          fcl.authorizations([fcl.authz]),
          fcl.limit(100),
        ])
        .then(fcl.decode);

      console.log(transactionID);
      return fcl.tx(transactionID).onceSealed();
    } catch (error) {
      console.log("Error uploading file" + error);
    }
    //console.log(file);
  };

  useEffect(() => {
    fcl.currentUser().subscribe(setUser);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        hello world
        <h3>your address is :{user && user.addr ? user.addr : ""}</h3>
        <button onClick={() => login()}>Login</button>
        <div>
          <input
            type="text"
            onChange={(e) => setNFTName(e.target.value)}
            placeholder="Name Of the nft"
          />
          <input type="file" onChange={(e) => set_file()} />
          <button onClick={() => mint()}>Mint Nft</button>
        </div>
      </header>
    </div>
  );
}

export default App;
