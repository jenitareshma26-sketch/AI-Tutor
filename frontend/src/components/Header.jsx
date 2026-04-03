function Header({ title, subtitle }) {
  return (
    <div className="mb-2 rounded-[22px] border border-[#E6CBA8] bg-white/95 px-4 py-2.5 shadow-[0_8px_20px_rgba(89,29,29,0.06)] sm:px-5 sm:py-3">
      <div>
        <h1 className="text-[19px] font-black leading-tight text-[#7B1E1E] sm:text-[22px]">{title}</h1>
        <p className="mt-1 max-w-3xl text-xs leading-4 text-[#5E5448] sm:text-sm">{subtitle}</p>
      </div>
    </div>
  );
}

export default Header;
