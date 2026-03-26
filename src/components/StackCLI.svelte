<script>
  import { onMount, onDestroy } from 'svelte';

  const snippets = [
    { lang: 'svelte', code: '<script>\n  let count = $state(0);\n</' + 'script>' },
    { lang: 'astro', code: '---\nconst { title } = Astro.props;\n---' },
    { lang: 'react', code: 'export function App() {\n  return <h1>honsda</h1>;\n}' },
    { lang: 'typescript', code: 'type Project = {\n  id: string;\n  name: string;\n};' },
    { lang: 'python', code: 'def build():\n    return "shipping fast"' },
    { lang: 'java', code: 'public class Main {\n  public static void main() {}\n}' },
    { lang: 'cpp', code: '#include <iostream>\nint main() { return 0; }' }
  ];

  let container;
  let isVisible = true;
  let currentSnippetIndex = 0;
  let displayText = '';
  let isDeleting = false;
  let timeoutId;

  function highlight(code) {
    if (!code) return '';
    
    // 1. Define tokens with unique placeholders that won't be messed with
    let tokens = [];
    const pushToken = (text, className) => {
      const id = `##TOK${tokens.length}##`;
      tokens.push({ id, html: `<span class="${className}">${text}</span>` });
      return id;
    };

    let temp = code;

    // Strings
    temp = temp.replace(/(".*?"|'.*?')/g, (m) => pushToken(m, 'tok-string'));
    
    // Keywords
    temp = temp.replace(/\b(export|function|return|let|const|type|def|public|class|static|void|int|include|import|from|interface|string|number|boolean)\b/g, (m) => pushToken(m, 'tok-keyword'));
    
    // $state specifically
    temp = temp.replace(/\$state/g, (m) => pushToken(m, 'tok-function'));

    // Functions
    temp = temp.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\s*\()/g, (m) => pushToken(m, 'tok-function'));

    // Tags (e.g., <h1>, </h1>)
    temp = temp.replace(/(<\/?[a-zA-Z0-9]+)/g, (m) => {
      const tag = m.replace(/<\/??/, '');
      const prefix = m.startsWith('</') ? '</' : '<';
      return prefix + pushToken(tag, 'tok-tag');
    });

    // Punctuation
    temp = temp.replace(/([{}[\]();=+\-*/!%|,.])/g, (m) => pushToken(m, 'tok-punct'));

    // 2. Escape the remaining raw characters for HTML safety
    temp = temp.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // 3. Swap placeholders back for real HTML spans
    tokens.forEach(token => {
      temp = temp.replace(token.id, token.html);
    });
    
    return temp;
  }

  function type() {
    if (!isVisible) {
      timeoutId = setTimeout(type, 500);
      return;
    }

    const fullText = snippets[currentSnippetIndex].code;
    let typingSpeed = isDeleting ? 30 : 50;

    if (isDeleting) {
      displayText = fullText.substring(0, displayText.length - 1);
    } else {
      displayText = fullText.substring(0, displayText.length + 1);
    }

    if (!isDeleting && displayText === fullText) {
      isDeleting = true;
      typingSpeed = 2000;
    } else if (isDeleting && displayText === '') {
      isDeleting = false;
      currentSnippetIndex = (currentSnippetIndex + 1) % snippets.length;
      typingSpeed = 500;
    }

    timeoutId = setTimeout(type, typingSpeed);
  }

  onMount(() => {
    timeoutId = setTimeout(type, 1000);

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0 }
    );

    if (container) observer.observe(container);

    return () => {
      observer.disconnect();
    };
  });

  onDestroy(() => {
    if (timeoutId) clearTimeout(timeoutId);
  });
</script>

<div bind:this={container} class="cli-window border border-white/10 bg-black/40 backdrop-blur-sm rounded-lg overflow-hidden shadow-2xl flex flex-col h-full">
  <div class="cli-header bg-white/5 px-4 py-2 flex items-center justify-between border-b border-white/5 shrink-0">
    <div class="flex gap-1.5">
      <div class="w-2.5 h-2.5 rounded-full bg-paper/20"></div>
      <div class="w-2.5 h-2.5 rounded-full bg-paper/20"></div>
      <div class="w-2.5 h-2.5 rounded-full bg-paper/20"></div>
    </div>
    <div class="font-mono text-[9px] uppercase tracking-[0.2em] text-paper/60">
      {snippets[currentSnippetIndex].lang}
    </div>
  </div>
  <div class="cli-body p-5 flex-1 font-mono text-[11px] leading-relaxed text-paper/60 whitespace-pre overflow-hidden">
    <code>{@html highlight(displayText)}</code><span class="cursor" style="animation-play-state: {isVisible ? 'running' : 'paused'}">_</span>
  </div>
</div>

<style>
  .cli-window {
    width: 100%;
    min-height: 120px;
  }

  :global(.tok-keyword) { color: #9d7cd8; font-weight: 500; } /* Soft Purple */
  :global(.tok-string) { color: #9ece6a; }            /* Soft Green */
  :global(.tok-function) { color: #7aa2f7; }          /* Soft Blue */
  :global(.tok-tag) { color: #f7768e; }               /* Soft Red/Coral */
  :global(.tok-punct) { color: #565f89; }             /* Muted Blue-Grey */

  .cursor {
    animation: blink 1s step-end infinite;
    color: #7aa2f7;
    text-shadow: 0 0 5px rgba(122, 162, 247, 0.3);
  }

  @keyframes blink {
    from, to { opacity: 1; }
    50% { opacity: 0; }
  }
</style>
