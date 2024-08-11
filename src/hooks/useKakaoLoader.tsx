import { useKakaoLoader as useKakaoLoarderOrigin } from 'react-kakao-maps-sdk';

export default function useKakaoLoader() {
  useKakaoLoarderOrigin({
    appkey: process.env.NEXT_PUBLIC_MAP_KEY!,
    libraries: ["clusterer", "drawing", "services"],
  })
}