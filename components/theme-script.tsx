export function ThemeScript() {
  const code = `(function(){try{var t=localStorage.getItem("standard-ui-theme");var d=t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);if(d)document.documentElement.classList.add("dark");}catch(e){}})();`;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
