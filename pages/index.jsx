import moment from "moment/moment";
import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import React, { useEffect, useRef, useState } from "react";
import CustomCursor from "../components/CustomCursor";
import axios from "axios";

export default function Home() {
  function greetings() {
    var currentHour = moment().format("HH");

    if (currentHour >= 3 && currentHour < 12) {
      return "Good Morning ! ⛅";
    } else if (currentHour >= 12 && currentHour < 15) {
      return "Good Afternoon ! ☀️";
    } else if (currentHour >= 15 && currentHour < 20) {
      return "Good Evening ! ⛅";
    } else if (currentHour >= 20 || currentHour < 3) {
      return "Good Night ! 🌘";
    } else {
      return "Hello!";
    }
  }

  const openPdfInNewTab = () => {
    const pdfUrl = "/CV_2023_MUHAMMAD_ADVIE_RIFALDY.pdf";
    window.open(pdfUrl, "_blank");
  };

  useEffect(() => {
    const follower = document.getElementById("follower");

    // Function to update the follower position based on cursor movement
    const updateFollowerPosition = (event) => {
      const x = event.clientX;
      const y = event.clientY;

      const followerWidth = follower.offsetWidth;
      const followerHeight = follower.offsetHeight;

      const xOffset = x - followerWidth / 2;
      const yOffset = y - followerHeight / 2;

      follower.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    };

    // Attach event listener to track cursor movement
    document.addEventListener("mousemove", updateFollowerPosition);

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("mousemove", updateFollowerPosition);
    };
  }, []);

  const [scrollPosition, setScrollPosition] = useState(0);
  const [menu1Position, setMenu1Position] = useState([]);
  const [menu2Position, setMenu2Position] = useState([]);
  const bodyRef = useRef();
  const contentRef = useRef();
  const menu1Ref = useRef();
  const menu2Ref = useRef();

  const handleScroll = () => {
    const scrollPosition = contentRef.current.scrollTop;
    setScrollPosition(scrollPosition);
    // console.log("Scroll position:", scrollPosition);
  };

  const getDistanceFromTop = (reference) => {
    {
      const targetElement = reference.current;
      const parentElement = contentRef.current;
      if (targetElement && parentElement) {
        const targetRect = targetElement.getBoundingClientRect();
        const parentRect = parentElement.getBoundingClientRect();

        const distanceFromTop = targetRect.top - parentRect.top;
        return distanceFromTop;
      }
    }
  };

  useEffect(() => {
    setMenu1Position(getDistanceFromTop(menu1Ref));
    setMenu2Position(getDistanceFromTop(menu2Ref));
  }, []);

  const [userInfo, setUserInfo] = useState(null);
  const [badgeData, setBadgeData] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = process.env.NEXT_PUBLIC_TOKEN;
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const username = "madvier83";

        const response = await fetch(
          `https://api.github.com/users/${username}`,
          {
            headers,
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
        } else {
          console.error("Request failed with status", response.status);
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>M Advie Rifaldy</title>
      </Head>
      <CustomCursor />
      <div
        id="follower"
        className="w-[80vmin] h-[80vmin] absolute follower"
      ></div>
      <div
        className="h-full min-h-screen w-full text-slate-200 cursor-none select-none"
        ref={bodyRef}
      >
        <div className="flex flex-col lg:flex-row justify-center">
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end px-2 pt-8 lg:pt-16 lg:px-16 mt-8 mb-8">
            <div className="flex flex-col max-w-lg min-h-[90vh] lg:min-h-0 px-4 hover:brightness-[1.4] transition-all duration-300">
              <div className="">
                <p className="text-6xl font-bold">M Advie Rifaldy</p>
                <p className="text-3xl font font-semibold mt-4">
                  Frontend Developer
                </p>
                <p className="text-1xl mt-4 text-slate-500">
                  Im a frontend developer with a passion for crafting beautiful
                  and intuitive user interfaces.
                </p>
              </div>
              <div className="flex flex-col mt-24 lg:mt-36 gap-1">
                <p
                  className={`tracking-wide truncate w-full transition-all duration-300 group flex gap-4 ${
                    scrollPosition <= 0
                      ? "font-semibold tracking-wider text-slate-200"
                      : "text-slate-500"
                  }`}
                  onClick={() =>
                    contentRef.current.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    })
                  }
                >
                  <span
                    className={`${
                      scrollPosition <= 0
                        ? "opacity-100"
                        : "opacity-10 group-hover:opacity-50 transition-all"
                    }`}
                  >
                    ◇
                  </span>
                  Introduction
                </p>
                <p
                  className={`tracking-wide truncate w-full transition-all duration-300 group flex gap-4 ${
                    scrollPosition != 0 &&
                    scrollPosition < getDistanceFromTop(menu2Ref) + 1600
                      ? "font-semibold tracking-wider text-slate-200"
                      : "text-slate-500"
                  }`}
                  onClick={() =>
                    contentRef.current.scrollTo({
                      top: menu1Position - 100,
                      behavior: "smooth",
                    })
                  }
                >
                  <span
                    className={`${
                      scrollPosition != 0 &&
                      scrollPosition < getDistanceFromTop(menu2Ref) + 1600
                        ? "opacity-100"
                        : "opacity-10 group-hover:opacity-50 transition-all"
                    }`}
                  >
                    ◇
                  </span>
                  Relevant Experience
                </p>
                <p
                  className={`tracking-wide truncate w-full transition-all duration-300 group flex gap-4 ${
                    scrollPosition >= getDistanceFromTop(menu2Ref) + 1600
                      ? "font-semibold tracking-wider text-slate-200"
                      : "text-slate-500"
                  }`}
                  onClick={() =>
                    contentRef.current.scrollTo({
                      top: menu2Position - 100,
                      behavior: "smooth",
                    })
                  }
                >
                  <span
                    className={`${
                      scrollPosition >= getDistanceFromTop(menu2Ref) + 1600
                        ? "opacity-100"
                        : "opacity-10 group-hover:opacity-50 transition-all"
                    }`}
                  >
                    ◇
                  </span>
                  Personal Details
                </p>
              </div>
              <div className="mt-auto">
                <div className="flex text-slate-500 relative justify-center lg:justify-start">
                  <div
                    href="https://github.com/madvier83"
                    target="_blank"
                    className="group cursor-none"
                  >
                    <a
                      href="https://github.com/madvier83"
                      target="_blank"
                      className="cursor-none text-white lg:text-slate-500 hover:text-white group-hover:text-white peer p-4 pl-2"
                    >
                      <i className="fa-brands transition-all fa-github text-2xl"></i>
                    </a>
                    <div className="absolute glass px-8 py-6 max-w-sm bottom-12 left-2 lg:left-0 w-[80vw] lg:opacity-0 peer-hover:opacity-100 hover:opacity-100 transition-all duration-300 delay-100">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-slate-300 overflow-hidden">
                          <img
                            className="brightness-75"
                            src={userInfo?.avatar_url || ""}
                            width={64}
                            height={64}
                          ></img>
                        </div>
                        <div className="">
                          <p className="highlight truncate">
                            {userInfo?.name || ""}
                          </p>
                          <p>{userInfo?.login || ""}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="text-sm flex items-center gap-2">
                          <i className="fa-regular fa-user text-xs"></i>{" "}
                          <p className="highlight">
                            {userInfo?.followers || ""}
                          </p>{" "}
                          Followers •
                          <p className="highlight">
                            {userInfo?.following || ""}
                          </p>{" "}
                          Following
                        </div>
                        <div className="text-sm flex items-center gap-2 mt-1">
                          <i className="fa-regular fa-bookmark text-xs"></i>{" "}
                          <p className="highlight">
                            {userInfo?.public_repos || ""}
                          </p>{" "}
                          Public repositories
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="group">
                    <a
                      href="https://dribbble.com/madvier_83"
                      target="_blank"
                      className="cursor-none hover:text-white peer p-4"
                    >
                      <i className="fa-brands transition-all fa-dribbble text-2xl"></i>
                    </a>
                  </div>
                  <div className="group">
                    <a
                      href="https://twitter.com/madvier01"
                      target="_blank"
                      className="cursor-none hover:text-white peer p-4"
                    >
                      <i className="fa-brands transition-all fa-twitter text-2xl"></i>
                    </a>
                  </div>
                  <div className="group">
                    <a
                      href="https://www.linkedin.com/in/muhammad-advie-rifaldy-a9790b251/"
                      target="_blank"
                      className="cursor-none hover:text-white peer p-4"
                    >
                      <i className="fa-brands transition-all fa-linkedin text-2xl"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start min-h-screen px-2 lg:px-16">
            <div
              className="flex flex-col gap-4 max-w-lg px-4 hover:brightness-[1.4] group transition-all duration-300 pt-16 pb-10 lg:h-screen overflow-y-scroll hide-scroll"
              ref={contentRef}
              onScroll={() => handleScroll()}
            >
              <p className="highlight mt-8">Hi, {greetings()}</p>
              <div className="text-justify text-slate-500 flex flex-col gap-4">
                <p className="">
                  My name is Muhammad Advie Rifaldy, IT graduates from
                  Indonesia. With{" "}
                  <span className="highlight">
                    5 years of experience in programming{" "}
                  </span>
                  , I have developed a strong foundation and a passion for
                  frontend development.
                </p>
                <p>
                  I possess strong{" "}
                  <span className="highlight">problem-solving abilities</span>,
                  allowing me to analyze situations, identify areas for
                  improvement, and implement effective solutions.
                </p>

                <div className="flex items-center justify-between mt-24">
                  <p className="highlight truncate w-full" ref={menu1Ref}>
                    ◇ Relevant Experience
                  </p>
                </div>

                <a
                  href="http://cursor.id/"
                  target="_blank"
                  className="flex hover:text-teal-500 peer cursor-none"
                >
                  <div className="border-l-2 h-full ml-[6px] mr-3 border-teal-500"></div>
                  <div className="">
                    <span className="flex group items-center gap-2 group-hover:gap-4 transition-all text-teal-500">
                      <p className="font-semibold">
                        Frontend Web Developer - Cursor.id
                      </p>
                      <i className="hover:text-teal-500 fas fa-arrow-right"></i>
                    </span>
                    <p className="text-slate-500">2022 - 2023</p>
                  </div>
                </a>
                <div className="w-full p-8 mt-2 glass">
                  <div>
                    <Image
                      alt=""
                      priority
                      src={"/apdoc1.gif"}
                      width={720}
                      height={720}
                      className="rounded-lg brightness-[.8] mb-4"
                    ></Image>
                    <p className="mt-2">
                      <a
                        className="text-teal-500 font-semibold cursor-none"
                        href="http://apdoc.id"
                        target="_blank"
                      >
                        Apdoc.id <i className="fas fa-link font-extralight"></i>
                      </a>
                    </p>
                    <p className="pt-2">
                      Develop and maintain a Clinic Information System & Point
                      Of Sales using Next.JS and Tailwind CSS.
                    </p>
                    <div className="flex gap-2 mt-4">
                      <div className="bg-blue-600 text-white px-4 py-1 rounded-lg brightness-125 w-[32%] flex justify-start gap-3 items-center truncate opacity-90">
                        <i className="fa-brands fa-react"></i> React.JS
                      </div>
                      <div className="bg-rose-600 text-white px-4 py-1 rounded-lg brightness-125 w-[32%] flex justify-start gap-3 items-center truncate opacity-90">
                        <i className="fa-brands fa-laravel"></i> Laravel
                      </div>
                      <div className="bg-teal-700 text-white px-4 py-1 rounded-lg brightness-125 w-[32%] flex justify-start gap-3 items-center truncate opacity-90">
                        Tailwind CSS
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full p-8 glass">
                  <div>
                    <Image
                      alt=""
                      priority
                      src={"/indopalm1.gif"}
                      width={720}
                      height={720}
                      className="rounded-lg brightness-[.8] mb-4"
                    ></Image>
                    <p className="mt-2">
                      <a
                        className="text-teal-500 font-semibold cursor-none"
                        href="https://indopalm.co.id"
                        target="_blank"
                      >
                        Indopalm.co.id{" "}
                        <i className="fas fa-link font-extralight"></i>
                      </a>
                    </p>
                    <p className="pt-2">
                      Developing company profile for marketing and SEO
                      optimization.
                    </p>
                    <div className="flex gap-2 mt-4">
                      <div className="bg-yellow-600 text-white px-4 py-1 rounded-lg brightness-125 w-[32%] flex justify-start gap-3 items-center truncate opacity-90">
                        <i className="fa-brands fa-js"></i> JavaScript
                      </div>
                      <div className="bg-rose-600 text-white px-4 py-1 rounded-lg brightness-125 w-[32%] flex justify-start gap-3 items-center truncate opacity-90">
                        <i className="fa-brands fa-laravel"></i> Laravel
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full p-8 glass">
                  <Image
                    alt=""
                    priority
                    src={"/portal1.png"}
                    width={720}
                    height={720}
                    className="rounded-lg mb-4"
                  ></Image>
                  <p className="mt-2">
                    <a
                      className="text-teal-500 font-semibold cursor-none"
                      href="https://sejati.life/"
                      target="_blank"
                    >
                      Sejati.life{" "}
                      <i className="fas fa-link font-extralight"></i>
                    </a>
                  </p>
                  <p className="pt-2">
                    Developing company profile for marketing and SEO
                    optimization.
                  </p>
                  <div className="flex gap-2 mt-4">
                    <div className="bg-yellow-600 text-white px-4 py-1 rounded-lg brightness-125 w-[32%] flex justify-start gap-3 items-center truncate opacity-90">
                      <i className="fa-brands fa-js"></i> JavaScript
                    </div>
                    <div className="bg-rose-600 text-white px-4 py-1 rounded-lg brightness-125 w-[32%] flex justify-start gap-3 items-center truncate opacity-90">
                      <i className="fa-brands fa-laravel"></i> Laravel
                    </div>
                  </div>
                </div>

                <a
                  href="https://cyberlabs.co.id/"
                  target="_blank"
                  className="flex hover:text-teal-500 peer cursor-none mt-2"
                >
                  <div className="border-l-2 h-full ml-[6px] mr-3 border-teal-500"></div>
                  <div className="">
                    <span className="flex group items-center gap-2 group-hover:gap-4 transition-all text-teal-500">
                      <p className="font-semibold hover:text-teal-500">
                        Fullstack Web Developer - Cyberlabs Forensics
                      </p>
                      <i className="hover:text-teal-500 fas fa-arrow-right"></i>
                    </span>
                    <p className="text-slate-500">2019 - 2020</p>
                  </div>
                </a>
                <div className="w-full p-8 mt-4 glass">
                  <div>
                    <Image
                      alt=""
                      priority
                      src={"/martpad1.png"}
                      width={720}
                      height={720}
                      className="rounded-lg brightness-[.8] mb-4"
                    ></Image>
                    <p className="mt-2">
                      <a
                        className="text-teal-200 text-opacity-30 font-semibold cursor-none"
                        href="http://apdoc.id"
                        target="_blank"
                      >
                        Martpad.000webhostapp.com{" "}
                        <i className="fas fa-link-slash font-extralight"></i>
                      </a>
                    </p>
                    <p className="pt-2">
                      Building ecommerce aplication using RajaOngkir API &
                      CodeIgniter 3.
                    </p>
                    <div className="flex gap-2 mt-4">
                      <div className="bg-orange-600 text-white px-4 py-1 rounded-lg brightness-125 w-[32%] flex justify-start gap-3 items-center truncate opacity-90">
                        CodeIgniter
                      </div>
                      <div className="bg-indigo-600 text-white px-4 py-1 rounded-lg brightness-125 w-[32%] flex justify-start gap-3 items-center truncate opacity-90">
                        <i className="fa-brands fa-bootstrap"></i> Bootstrap
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-24">
                <p className="highlight truncate w-full" ref={menu2Ref}>
                  ◇ Personal Details
                </p>
              </div>
              <buutton
                onClick={openPdfInNewTab}
                target="_blank"
                className="flex hover:text-teal-500 peer cursor-none mt-2"
              >
                <div className="border-l-2 h-full ml-[6px] mr-3 border-teal-500"></div>
                <div className="">
                  <span className="flex group items-center gap-2 group-hover:gap-4 transition-all text-teal-500">
                    <p className="font-semibold">View Full Resume</p>
                    <i className="hover:text-teal-500 fas fa-arrow-right"></i>
                  </span>
                  <p className="text-slate-500">Last updated 1 July 2023 </p>
                </div>
              </buutton>

              <div className="w-full p-8 glass text-slate-500">
                <p className="highlight mb-4">Contact Information</p>
                <table>
                  <tbody>
                    <tr>
                      <td className="w-1/4">Phone</td>
                      <td className="px-4">:</td>
                      <td className="select-all tracking-wide">
                        +62 823 7693 2445
                      </td>
                    </tr>
                    <tr>
                      <td className="w-1/4">Email</td>
                      <td className="px-4">:</td>
                      <td className="select-all tracking-wide">
                        madvier83@gmail.com
                      </td>
                    </tr>
                    <tr>
                      <td className="w-1/4">Address</td>
                      <td className="px-4">:</td>
                      <td className="select-all tracking-wide">
                        Kab. Bandung, Jawa Barat
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p className="highlight mb-4 mt-8">Skills</p>

                <p className="mb-2">Programming Languages</p>
                <div className="flex mb-4 flex-wrap gap-2">
                  <div className="bg-yellow-600 text-white px-4 py-1 rounded-lg brightness-125 w-[32%] flex justify-start gap-3 items-center truncate opacity-90">
                    <i className="fa-brands fa-js"></i> JavaScript
                  </div>
                  <div className="bg-blue-700 text-white px-4 py-1 rounded-lg brightness-125 w-[32%] flex justify-start gap-3 items-center truncate opacity-90">
                    <i className="fa-brands fa-js"></i> Typescript
                  </div>
                  <div className="bg-indigo-600 text-white px-4 py-1 rounded-lg brightness-125 w-[32%] flex justify-start gap-3 items-center truncate opacity-90">
                    <i className="fa-brands fa-php"></i> PHP
                  </div>
                  <div className="bg-blue-600 text-white px-4 py-1 rounded-lg brightness-125 w-[32%] flex justify-start gap-3 items-center truncate opacity-90">
                    <i className="fas fa-database"></i> SQL
                  </div>
                  {/* <div className="bg-cyan-700 text-white px-4 py-1 rounded-lg brightness-125 w-[32%] flex justify-start gap-3 items-center truncate opacity-90">
                    <i className="fa-brands fa-golang"></i> Go
                  </div> */}
                </div>
                <p className="mb-2">Libraries & Frameworks</p>
                <div className="flex mb-4 flex-wrap gap-2">
                  <div className="bg-zinc-900 text-white px-4 py-1 rounded-lg brightness-125 w-[32%] flex justify-start gap-3 items-center truncate opacity-90">
                    <i className="fas rotate-[270deg] fa-play"></i> Next.JS
                  </div>
                  <div className="bg-blue-600 text-white px-4 py-1 rounded-lg brightness-125 w-[32%] flex justify-start gap-3 items-center truncate opacity-90">
                    <i className="fa-brands fa-react"></i> React.JS
                  </div>
                  <div className="bg-blue-600 text-white px-4 py-1 rounded-lg brightness-125 w-[32%] flex justify-start gap-3 items-center truncate opacity-90">
                    React Native
                  </div>
                  <div className="bg-rose-700 text-white px-4 py-1 rounded-lg brightness-125 w-[32%] flex justify-start gap-3 items-center truncate opacity-90">
                    <i className="fa-brands fa-laravel"></i> Laravel
                  </div>
                  <div className="bg-indigo-600 text-white px-4 py-1 rounded-lg brightness-125 w-[32%] flex justify-start gap-3 items-center truncate opacity-90">
                    <i className="fa-brands fa-bootstrap"></i> Bootstrap
                  </div>
                  <div className="bg-orange-600 text-white px-4 py-1 rounded-lg brightness-125 w-[32%] flex justify-start gap-3 items-center truncate opacity-90">
                    CodeIgniter
                  </div>
                  <div className="bg-teal-700 text-white px-4 py-1 rounded-lg brightness-125 w-[32%] flex justify-start gap-3 items-center truncate opacity-90">
                    Tailwind CSS
                  </div>
                </div>
                <p className="mb-2">Tools & Platforms</p>
                <div className="flex mb-4 flex-wrap gap-2">
                  <div className="bg-zinc-900 text-white px-4 py-1 rounded-lg brightness-125 w-[32%] flex justify-start gap-3 items-center truncate opacity-90">
                    <i className="fa-brands fa-github"></i> GitHub
                  </div>
                  {/* <div className="bg-orange-600 text-white px-4 py-1 rounded-lg brightness-125 w-[32%] flex justify-start gap-3 items-center truncate opacity-90">
                    <i className="fa-brands fa-git"></i> Git
                  </div> */}
                  <div className="bg-zinc-900 text-white px-4 py-1 rounded-lg brightness-125 w-[32%] flex justify-start gap-3 items-center truncate opacity-90">
                    <i className="fas rotate-[270deg] fa-play"></i> Vercel
                  </div>
                  <div className="bg-zinc-900 text-white px-4 py-1 rounded-lg brightness-125 w-[32%] flex justify-start gap-3 items-center truncate opacity-90">
                    <i className="fa-brands fa-figma"></i> Figma
                  </div>
                </div>
                <p className="highlight mb-4 mt-8">Education</p>
                <div className="">
                  <p className="font-semibold">
                    STMIK Mardira Indonesia - Software Engineering
                  </p>
                  <p></p>
                  <p>2020 - Present</p>
                </div>
                <p className="highlight mb-4 mt-8">Interest</p>
                <p className="font-semibold">
                  Speed Cubing, Puzzle solving & Rythm games
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Script
        src="https://kit.fontawesome.com/9eabdadb40.js"
        crossorigin="anonymous"
      ></Script>
    </React.Fragment>
  );
}
