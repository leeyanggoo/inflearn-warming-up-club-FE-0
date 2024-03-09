import React, { useEffect, useState } from "react";
// import Swiper core and required modules
import { Pagination, A11y, Autoplay, EffectFade } from "swiper/modules";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { GoogleLogin } from "@react-oauth/google";

// custom pagination
import "./LoginPage.css";
import { jwtDecode } from "jwt-decode";

const LoginPage = ({ setIsLogin }) => {
  const [loginData, setLoginData] = useState([]);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    fetchLoginData();
  }, []);

  const fetchLoginData = async () => {
    const response = await fetch("./json/login.json");
    const data = await response.json();
    setLoginData(data);
  };

  const handleAutoPlay = () => {
    setAuto((auto) => !auto);
  };

  const googleLogin = async (credentialResponse) => {
    localStorage.setItem(
      "user",
      JSON.stringify(jwtDecode(credentialResponse.credential))
    );
    setIsLogin(true);
  };

  return (
    <main className="relative w-dvw h-dvh login-page">
      <section className="absolute z-10 p-40">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/archive/3/3e/20220128173228%21Disney%2B_logo.svg"
          alt="Disney Plus logo"
          className="w-60"
        />
        <h1 className="text-5xl font-bold leading-tight">
          이 모든 이야기가 여기에
          <br />
          지금 스트리밍 중
        </h1>
        <div className="w-full mt-5">
          <GoogleLogin
            onSuccess={(credentialResponse) => googleLogin(credentialResponse)}
          />
        </div>
      </section>
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, A11y]}
        autoplay={auto}
        effect={"fade"}
        pagination={{
          clickable: true,
        }}
        loop={true}
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        speed={2000}
      >
        <div>
          {loginData.map((data) => {
            const { backdrop_path, name, info } = data;
            return (
              <SwiperSlide key={name} className="relative">
                <img
                  className="absolute top-0 right-0 object-cover w-auto h-full"
                  src={backdrop_path}
                  alt={name}
                  loading="lazy"
                />
                <div className="absolute left-0 flex flex-col items-center justify-center w-full text-xs text-gray-400 bottom-10">
                  <p>{name}</p>
                  <p>{info}</p>
                </div>
              </SwiperSlide>
            );
          })}
        </div>
        <button
          className="absolute z-10 w-5 h-5 cursor-pointer bottom-24 right-[15dvw]"
          onClick={handleAutoPlay}
        >
          {auto ? (
            <img
              src="/images/button_stop.svg"
              alt="stop"
              className="object-contain w-full h-full"
            />
          ) : (
            <img
              src="/images/button_play.svg"
              alt="play"
              className="object-contain w-full h-full"
            />
          )}
        </button>
      </Swiper>
    </main>
  );
};

export default LoginPage;
