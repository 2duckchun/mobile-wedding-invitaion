"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

export const MapView = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) return;

    window.kakao.maps.load(() => {
      if (!mapRef.current) return;

      const map = new window.kakao.maps.Map(mapRef.current, {
        center: new window.kakao.maps.LatLng(
          37.535010507270265,
          127.13372022285776
        ),
        level: 3,
      });

      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(
        "서울 강동구 천호대로 1102 3층",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (result: any, status: any) => {
          if (status !== window.kakao.maps.services.Status.OK) return;

          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

          // 1) 마커 생성
          const marker = new window.kakao.maps.Marker({
            map,
            position: coords,
          });

          // 2) InfoWindow 콘텐츠 DOM 생성
          const infoContent = document.createElement("div");
          infoContent.innerHTML = `
          <div
            style="
              width: 150px;
              padding: 6px 8px;
              box-shadow: 0 2px 6px rgba(0,0,0,0.15);
              font-family: 'Nanum Myeongjo', serif;
              font-size: 13px;
              color: #5b3924;
              line-height: 1.5;
              box-sizing: border-box;
              cursor: pointer;
            "
          >
            <div style="margin-bottom: 2px;">💒 <strong>강동웨딩홀</strong></div>
            <div id="copy-address" style="font-size: 11px; color: #7b5e43;">
              서울 강동구 천호대로 1077
            </div>
          </div>
        `;

          // 3) 클릭 이벤트 바인딩
          infoContent
            .querySelector("#copy-address")!
            .addEventListener("click", () => {
              navigator.clipboard
                .writeText("서울 강동구 천호대로 1077")
                .then(() => alert("주소가 복사되었습니다."))
                .catch((err) => {
                  console.error("클립보드 복사 실패:", err);
                  alert("복사에 실패했습니다. 브라우저 설정을 확인해 주세요.");
                });
            });

          // 4) InfoWindow 생성 및 오픈
          const infowindow = new window.kakao.maps.InfoWindow({
            content: infoContent,
          });
          infowindow.open(map, marker);

          // 5) 지도 중심 이동
          map.setCenter(coords);
        }
      );
    });
  }, [loaded]);

  return (
    <article>
      <section className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold font-gowundodum text-center">
          👰‍♀️ 찾아오시는 길 🤵‍♂️
        </h3>
        <div className="w-full h-[400px]">
          <div id="map" className="w-full h-full" ref={mapRef}></div>
        </div>
        <div className="flex flex-col gap-2">
          <button
            className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold tracking-wide text-white bg-rose-400 hover:bg-rose-500 shadow-md hover:shadow-lg transition duration-150 ease-out before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-white/10 before:backdrop-blur-sm"
            onClick={() => {
              navigator.clipboard
                .writeText("서울 강동구 천호대로 1077")
                .then(() => alert("주소가 복사되었습니다."))
                .catch((err) => {
                  console.error("클립보드 복사 실패:", err);
                  alert("복사에 실패했습니다. 브라우저 설정을 확인해 주세요.");
                });
            }}
          >
            주소 복사
          </button>
          <p className="inline-flex items-center justify-center gap-2 w-full max-w-xl mx-auto px-4 py-3 text-sm leading-relaxed text-center font-gowundodum text-amber-900 bg-amber-100 border border-amber-200 rounded-lg shadow-sm">
            🚗 주차 공간이 협소할 수 있으니 — 가급적 대중교통을 이용해 주세요!
          </p>
        </div>
        <Script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&libraries=services&autoload=false`}
          strategy="afterInteractive"
          onLoad={() => setLoaded(true)}
        ></Script>
      </section>
    </article>
  );
};
