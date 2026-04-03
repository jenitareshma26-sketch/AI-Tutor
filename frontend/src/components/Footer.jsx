function Footer() {
  return (
    <footer className="border-t border-[#E6CBA8] bg-[#F5E6D3]">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-gray-600 sm:flex-row sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} Tutorix AI. All rights reserved.</p>
        <p>Built like a premium AI tutor platform.</p>
      </div>
    </footer>
  );
}

export default Footer;
