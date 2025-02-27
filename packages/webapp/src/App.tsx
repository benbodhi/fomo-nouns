import { useEffect, useMemo } from 'react';
import { useEthers } from '@usedapp/core';
import { useAppDispatch, useAppSelector } from './hooks';

import { contract as AuctionContract } from './wrappers/nounsAuction';
import { setAuctionEnd } from './state/slices/auction';
import { setNextNounId, setDisplaySingleNoun } from './state/slices/noun';
import { setBlockAttr } from './state/slices/block';
import { provider } from './config';

import classes from './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './components/NavBar';
import Noun  from './components/Noun';
import Title from './components/Title';
import VoteBar from './components/VoteBar';
import VoteProgressBar from './components/VoteProgressBar';
import Documentation from './components/Documentation';
import Banner from './components/Banner';
import Footer from './components/Footer';
import SettledAuctionModal from './components/SettledAuctionModal';
import NotificationToast from './components/NotificationToast';

import { setActiveAccount } from './state/slices/account';
import { markVoterInactive } from './middleware/voteWebsocket';
import { openEthereumSocket } from './middleware/alchemyWebsocket';



function App() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { account } = useEthers();
  const dispatch = useAppDispatch();
  const isCoolBackground = useAppSelector(state => state.noun.isCoolBackground);
  const missedVotes = useAppSelector(state => state.vote.missedVotes);

  useMemo(async ()=> { // Initalized before mount
    const [{number: blocknumber, hash: blockhash}, auction] = await Promise.all([
      provider.getBlock('latest'),
      AuctionContract.auction()
    ])

    const nextNounId = parseInt(auction?.nounId) + 1;
    const auctionEnd = auction?.endTime.toNumber();

    dispatch(setNextNounId(nextNounId));
    dispatch(setAuctionEnd(auctionEnd));
    dispatch(setBlockAttr({blocknumber, blockhash}))
    if (nextNounId === 420) {
      dispatch(setDisplaySingleNoun(false));
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(setActiveAccount(account));
  }, [dispatch, account]);

  // Initialize Ethereum WebSocket on mount
  useEffect(() => {
    dispatch(openEthereumSocket());
  }, [dispatch]);

  // Deal with inactive users
  useEffect(() => {
    if (missedVotes > 3) {
      dispatch(markVoterInactive());
    }
  }, [dispatch, missedVotes]);


  return (
    <div className={`${classes.App} ${isCoolBackground ? classes.bgGrey : classes.bgBeige}`}>
      <NavBar />
      <Title/>
      <VoteProgressBar/>
      <SettledAuctionModal/>
      <Noun />
      <VoteBar />
      <Banner />
      <Documentation />
      <Footer/>
      <NotificationToast />
    </div>
  );
}

export default App;
