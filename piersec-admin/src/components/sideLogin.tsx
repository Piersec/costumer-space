export default function SideLogin() {
    return (
        <>
        <div className="relative w-[1176px] h-[850px] bg-black rounded-[50px] overflow-hidden ">

      <h2 className="text-white text-[2.5rem] font-bold absolute top-[100px] left-[100px] w-[600px]">
        CIBERSEGURANÇA de ponta para proteger operações críticas e evitar prejuízos reais.</h2>

  <h1
    className="
      absolute
      bottom-[-65px]
      left-1/2
      -translate-x-1/2
      text-white
      text-[16rem]
      font-black
      leading-none
      whitespace-nowrap
    "
  >
    PIERSEC
  </h1>

  {/* Fade preto na parte inferior */}
  <div
    className="
      absolute
      bottom-0
      left-0
      w-full
      h-40
      bg-gradient-to-t
      from-black
      via-black/30
      to-transparent
      pointer-events-none
    "
  />
</div>
        </>
    )
}