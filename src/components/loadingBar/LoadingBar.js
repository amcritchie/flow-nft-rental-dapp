import { useState, useEffect } from 'react';

const LoadingBar = ({ observedStatus, loadingType }) => {

  // observedStatus -> Status that updates from parent state.
  // loadingType -> Default 'flowTransaction', describes the type loading and progress steps.

  const [transactionStatus, setTransactionStatus] = useState({}) // NEW    
  const [isLoading, setIsLoading] = useState(false) // NEW

  // Run hook when user state changes.  Dependancy [user]
  useEffect(() => {
    setTransactionStatus(observedStatus);
      
    console.log('Transaction Status Updated');
    console.log('New Observed Status: ' + observedStatus);
    console.log('==========================|');
      
    switch (observedStatus) {
        case 0:
          // The transaction status is not known.
          setTransactionStatus({status: 'unknown', copy: "Unknown Status '0'", progressPercent: 65, colorClass: 'bg-orange-600 text-orange-100', description: 'The transaction status is not known.'})
          break;
        case 'step1':
          // Step 1
          setTransactionStatus({status: 'pending', copy: '⚙️ Pending', progressPercent: 15, colorClass: 'bg-green-600 text-green-100', description: 'Manual step to signify the loading starting.'})
          break;
        case 1:
          // The transaction has been received by a collector but not yet finalized in a block.
          setTransactionStatus({status: 'pending', copy: '⚙️ Pending', progressPercent: 40, colorClass: 'bg-green-600 text-green-100', description: 'The transaction has been received by a collector but not yet finalized in a block.'})
          break;
        case 2:
          // The consensus nodes have finalized the block that the transaction is included in.
          setTransactionStatus({status: 'finalized', copy: 'Finalized', progressPercent: 60, colorClass: 'bg-orange-600 text-orange-100', description: 'The consensus nodes have finalized the block that the transaction is included in.'})
          break;
        case 3:
          // The execution nodes have produced a result for the transation.
          setTransactionStatus({status: 'executed', copy: '🤝 Executed', progressPercent: 80, colorClass: 'bg-green-600 text-green-100', description: 'The execution nodes have produced a result for the transation.'})
          break;
        case 4:
          // The verification nodes have verified the transaction (the block in which the transaction is) and the seal is included in the latest block.
          setTransactionStatus({status: 'sealed', copy: '✅ Sealed', progressPercent: 100, colorClass: 'bg-blue-600 text-blue-100', description: 'The verification nodes have verified the transaction (the block in which the transaction is) and the seal is included in the latest block.'})
          break;
        case 5:
          // The transaction we submitted past its expiration.
          setTransactionStatus({status: 'expired', copy: 'Expired', progressPercent: 90, colorClass: 'bg-red-600 text-blredue-100', description: 'The transaction we submitted past its expiration.'})
          break;
        case '':
          // The transaction status was broadcasted as '' . This seems to mean that the transaction is still in the same state.
          setTransactionStatus({status: 'default', copy: "❔ Blank Status '" + observedStatus + "'", progressPercent: 25, colorClass: 'bg-orange-600 text-orange-100', description: '...'})
          break;
        default:
          setTransactionStatus({status: 'default', copy: "Unknown Status of '" + observedStatus + "'", progressPercent: 65, colorClass: 'bg-red-600 text-red-100', description: '...'})
      }
  }, [observedStatus]);

  return ( 
      <div className="loadingBar">
          <div>
              <div class="mb-1 text-lg font-medium dark:text-black">{transactionStatus.copy}</div>
              <div className="w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700">
                <div className={'h-6 text-l font-medium text-right pr-4 p-0.5 leading-none rounded-full ' + transactionStatus.colorClass} style={{ width: transactionStatus.progressPercent + '%' }}>{transactionStatus.copy}</div>
              </div>
          </div>
      </div>
     );
}
 
export default LoadingBar;