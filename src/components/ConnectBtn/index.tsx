import { ConnectButton } from '@rainbow-me/rainbowkit';
export const CustomBtn = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <a className='nav-link title-24 bold background-green' onClick={openConnectModal} type="button">
                    Connect Wallet
                  </a>
                );
              }
              if (chain.unsupported) {
                return (
                  <a className='nav-link title-24 bold background-green' onClick={openChainModal} type="button">
                    Wrong network
                  </a>
                );
              }
              return (
          
             
                  <a className='nav-link title-24 bold background-green' onClick={openAccountModal} type="button">
                    {account.displayName}
                  </a>
        
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
