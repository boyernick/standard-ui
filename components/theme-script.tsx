export function ThemeScript() {
  const code = `(function(){try{var t=localStorage.getItem("standard-ui-theme");var d=t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);var h=document.documentElement;h.classList.toggle("dark",d);h.style.colorScheme=d?"dark":"light";var s=function(){var f=document.querySelector('link[rel="icon"][href*="favicon"]');if(f)f.setAttribute("href",d?"/favicon-dark.svg?v=6":"/favicon.svg?v=6");return!!f};if(!s())document.addEventListener("DOMContentLoaded",s,{once:true});}catch(e){}})();`;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
