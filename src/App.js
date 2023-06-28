import './App.css';
import * as fcl from '@onflow/fcl';

fcl.config()
.put("accessNode.api", "https://access-testnet.onflow.org")
.put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn")

function App() {

const login= () =>{
  fcl.authenticate();
}

  return (
    <div className="App">
      <header className="App-header">
        hello world
        <button onClick={() =>login()}>Login</button>
      </header>
    </div>
  );
}

export default App;
