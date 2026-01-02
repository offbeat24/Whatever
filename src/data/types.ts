// 카카오맵 API 응답 타입 (API 응답은 y, x가 string으로 올 수 있음)
export interface KakaoPlaceResponse {
  id: string;
  place_name: string;
  address_name: string;
  road_address_name?: string;
  y: string | number; // latitude (API 응답은 string)
  x: string | number; // longitude (API 응답은 string)
  category_group_code: string;
  category_name?: string;
  phone?: string;
  place_url?: string;
}

// 변환된 KakaoPlace 타입 (y, x가 number로 변환됨)
export interface KakaoPlace {
  id: string;
  place_name: string;
  address_name: string;
  road_address_name?: string;
  y: number; // latitude
  x: number; // longitude
  category_group_code: string;
  category_name?: string;
  phone?: string;
  place_url?: string;
}

// 애플리케이션에서 사용하는 통합 Place 타입
export interface Place {
  id: string;
  place_name: string;
  address_name: string;
  y: number; // latitude
  x: number; // longitude
  category_group_code: string;
}

// 선택된 장소 타입 (검색/북마크/히스토리)
export type PlaceType = 'search' | 'bookmark' | 'history' | 'random';

export interface SelectedPlace {
  place: Place;
  type: PlaceType;
}
