import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from 'web3modal';
import {useEffect, useState} from "react";
import {ethers} from "ethers";
import {Button, Center, Text, Textarea, Alert} from "@mantine/core";
import {abi, contractAddress} from "../config/constants";

let web3Modal;

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {8995: "https://core.bloxberg.org"}
    }
  }
}

if (typeof window != 'undefined') {
  web3Modal = new Web3Modal({
    cacheProvider: false,
    providerOptions,
  })
}

export default function Connect() {

  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState(undefined);
  const [isConnected, setIsConnected] = useState(false);

  const [contract, setContract] = useState(undefined);
  const [currentUserAddress, setCurrentUserAddress] = useState('');

  const [parcelCode, setParcelCode] = useState('');
  const [dataFromChain, setDataFromChain] = useState([]);

  const [screenInfo, setScreenInfo] = useState('');

  useEffect(() => {
    checkMetamask();

    if (isConnected)
      initialize()

  })

  const checkMetamask = () => {
    if (typeof window.ethereum !== 'undefined') {
      setHasMetamask(true)
    } else {
      setHasMetamask(false)
    }
  }

  async function connect() {
    if (hasMetamask) {
      const web3ModalProvider = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(web3ModalProvider)

      setSigner(provider.getSigner())
      setIsConnected(true)
    }
  }

  async function initialize () {

    const contract = new ethers.Contract(contractAddress, abi, signer);
    const currentUserAddress = await window.ethereum.request({method: 'eth_accounts'})

    setContract(contract)
    setCurrentUserAddress(currentUserAddress)
  }

  async function createParcel() {
    if (hasMetamask && isConnected) try {

      var parcelCode = makeid(16);     

      console.log(parcelCode)

      const transaction = await contract.createParcel(parcelCode, new Date().toLocaleString(), currentUserAddress[0], "Parcel1", "Praha", "Brno", "0x700cc0FE831dFcb65E524101DD3043aD0a008279")

      console.log(transaction);

      setScreenInfo("Parcel was created. Your Parcel code: " + parcelCode);

    } catch (e) {
      console.log(e)
    }
  }

  async function updateParcelLocation() {
    if (hasMetamask && isConnected) try {

      await contract.updateParcelLocation(parcelCode, currentUserAddress[0], "Jihlava")

    } catch (e) {
      console.log(e)
    }
  }

  async function parcelInfo() {
    if (hasMetamask && isConnected) try {
      
    const response = await contract.parcelInfo(parcelCode, currentUserAddress[0])

    if (response.lastUpdate == ""){
      setScreenInfo("Parcel not found")
    }
    else{
      setScreenInfo(
        `Information about parcel with code ${parcelCode}:\n
        SENDER: ${response.sender}
        RECEIVER: ${response.receiver}
        STATUS: ${response.status==0? "Preparing":response.status==1? "Shipping":response.status==2? "Received":"Unknown" }
        CURRENT LOCATION: ${response.currentLocation}
        LAST UPDATE: ${response.lastUpdate}
        FROM: ${response.from}
        TO: ${response.to}`);
      console.log(response);
    }   
    

    } catch (e) {
      console.log(e)
    }
  }  

  return (
    <Center style={{display: "flex", justifyContent: "center", height: '100vh'}}>
      {hasMetamask ? (
        isConnected ? (

          <div><Center>            

            <Textarea
              value={parcelCode}
              onChange={(event) => setParcelCode(event.currentTarget.value)}
              placeholder={"Write your parcel code"}
              label={"Find information about the parcel"}
            />            

          </Center>

          <Center style={{marginTop: '20px'}}>
          <Button onClick={() => parcelInfo()}>
              Get parcel
            </Button>
          </Center>

            <Center>
            <div style={{ width: '500px', marginTop: '20px' }}>
  {screenInfo !== '' ? (
    <Alert variant="light" color="blue" title="Information" style={{ whiteSpace: 'pre-line' }}>
      {screenInfo}
    </Alert>
  ) : (
    ''
  )}
</div>      
            </Center></div>



          ) : (
          <Button onClick={() => connect()}>
            Connect
          </Button>
        )
      ) : ("Download Metamask! ")}
    </Center>
  )
}
