export default function Navigation() {
  return (
    <div className="fixed laptop:top-0 laptop:left-0 laptop:h-full laptop:w-[4.6875rem] laptop:bg-orange-o3 laptop:shadow-lg laptop:p-4 laptop:z-10
    bottom-0 left-0 w-full h-16 bg-orange-o3 shadow-lg p-4 z-10 flex laptop:flex-col justify-center items-center">
      <h2 className="laptop:block hidden">사이드바 내용</h2>
      <p className="laptop:block hidden">이곳에 사이드바 내용을 추가하세요</p>
      <div className="laptop:hidden flex justify-around w-full">
        <span>홈</span>
        <span>메뉴</span>
        <span>설정</span>
      </div>
    </div>
  );
}

