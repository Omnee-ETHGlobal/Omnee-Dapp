import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";


const Navbar: React.FC = () => {

  useEffect(() => {
    const menuToggle = document.getElementById('menu-toggle');
    const extraLinks = document.getElementById('extra-links');

    if (menuToggle && extraLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            if (extraLinks.classList.contains('d-none')) {
                extraLinks.classList.remove('d-none');
                extraLinks.classList.add('show', 'd-block');
            } else {
                extraLinks.classList.remove('show', 'd-block');
                extraLinks.classList.add('d-none');
            }
        });
    }

    const navbar = document.querySelector('.container-nav') as HTMLElement;
    let lastScrollTop = 0;

    const handleScroll = () => {
        let st = window.pageYOffset || document.documentElement.scrollTop;

        if (st > lastScrollTop) {
            navbar.style.top = "-120px";
        } else {
            navbar.style.top = "20px";
        }
        lastScrollTop = st <= 0 ? 0 : st;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
        window.removeEventListener("scroll", handleScroll);
    };
}, []);
    return (
        <>
        {/*NAV DESKTOP*/}
        <div
          className="container-nav fixed-top d-none d-lg-block"
          style={{ top: 20 }}
        >
          <div className="navbarz" style={{ transition: "top 0.3s" }}>
            <div className="row align-items-center">
              <div className="col-3">
                <a href="/">
                  <img src="/images/logo.svg" width="110px" alt="" />
                </a>
              </div>
              <div className="col-6 text-center">
                <Link className="simple-link regular-text m-2" href="/">
                  Create token
                </Link>
                <Link className="simple-link regular-text m-2" href="/app">
                  All tokens
                </Link>
                <a className="simple-link regular-text m-2" target="_blank" href="https://github.com/OmneeFun-ETH-GLOBAL/OmneeFun-Dapp">
                  Github
                </a>
              </div>
              <div className="col-3 text-end">
                <ConnectButton />
              </div>
            </div>
          </div>
        </div>
        {/*NAV MOBILE*/}
        <div
          className="container-nav navscroll fixed-top d-block d-lg-none"
          style={{ top: 10 }}
        >
          <div
            className="navbarz-mobile"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              backdropFilter: "blur(20px)",
              padding: "15px 10px",
              borderRadius: 10
            }}
          >
            <div className="row">
              <div className="col-4">
                <img src="/images/logo.svg" alt="" width="90px" />
              </div>
              <div className="col-8 text-end">
                         <a href="#" id="menu-toggle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={24}
                    height={24}
                    fill="rgba(255,255,255,1)"
                  >
                    <path d="M3 4H21V6H3V4ZM9 11H21V13H9V11ZM3 18H21V20H3V18Z" />
                  </svg>
                </a>
              </div>
            </div>
            <div
              id="extra-links"
              className="row mt-2 d-none mb-3"
              style={{ padding: "20px 20px 0 20px" }}
            >
              <div className="col-12 text-center">
              <Link href="/" className="simple-link d-block mb-3">
               Create Token
                </Link>
              </div>
      
              <div className="col-12 text-center">
                <Link href="/app" className="simple-link d-block mb-3">
                  All tokens
                </Link>
              </div>
              <div className="col-12 text-center">
                <a target="_blank" href="https://github.com/OmneeFun-ETH-GLOBAL/OmneeFun-Dapp" className="simple-link d-block mb-3">
                  Github
                </a>
              </div>
              <div className="col-12 text-center justify-content-center d-flex">
              <ConnectButton />
                </div>
            </div>
          </div>
        </div>
      </>
      
    )
}

export default Navbar;