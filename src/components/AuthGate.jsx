import { useEffect, useState } from 'react';
import { BookOpen, LoaderCircle, LogIn, UserPlus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import App from '../App';

export default function AuthGate() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(Boolean(supabase));
  const [started, setStarted] = useState(false);
  const [showLanding, setShowLanding] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setLoading(false); });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const goHome = (event) => {
      if (event.target.closest?.('.brand')) { setStarted(false); setShowLanding(true); }
      if (event.target.closest?.('.hero-preview')) { setStarted(true); setShowLanding(false); }
      const card = event.target.closest?.('.card');
      if (card && !event.target.closest('button,a')) {
        const link = card.querySelector('a[href]');
        if (link) window.open(link.href, '_blank', 'noopener,noreferrer');
      }
    };
    document.addEventListener('click', goHome);
    return () => document.removeEventListener('click', goHome);
  }, []);

  if (!supabase) return started ? <App /> : <Landing onStart={()=>setStarted(true)} local />;
  if (loading) return <div className="auth-screen"><LoaderCircle className="spin" size={24}/><p>Checking your student session…</p></div>;
  if (session) return showLanding ? <Landing onStart={()=>setShowLanding(false)} authenticated /> : <App session={session} onHome={()=>setShowLanding(true)} />;
  return started ? <AuthForm /> : <Landing onStart={()=>setStarted(true)} />;
}

function Landing({ onStart, local }) {
  return <main className="landing"><nav className="landing-nav"><div className="auth-brand"><BookOpen size={25}/><span>CAMPUS<br/><b>RESOURCE HUB</b></span></div><button className="landing-login" onClick={onStart}>Student sign in</button></nav><section className="hero"><div className="hero-copy"><div className="eyebrow">A QUIET PLACE TO STUDY</div><h1>Find what you need.<br/><em>Keep learning.</em></h1><p>One focused space for notes, links, and study resources shared by your campus community.</p><div className="hero-actions"><button className="add" onClick={onStart}>{local?'Explore resources':'Get started'} <span>→</span></button>{!local&&<span className="hero-note">Free for students</span>}</div></div><div className="hero-preview glass"><div className="preview-top"><span className="preview-dot"/><span>KNOWLEDGE INDEX</span><span className="preview-count">24+ resources</span></div><div className="preview-search">⌕&nbsp; Search the index…</div><div className="preview-row"><span>DBMS Normalization Cheatsheet</span><b>SEM 3</b></div><div className="preview-row"><span>Calculus Practice and Concepts</span><b>SEM 1</b></div><div className="preview-row"><span>Digital Electronics Reference</span><b>SEM 3</b></div></div></section><section className="landing-story"><div className="story-intro"><div className="eyebrow">DESIGNED AROUND YOUR STUDY FLOW</div><h2>Less searching.<br/><em>More studying.</em></h2><p>Campus Resource Hub brings the materials students already share into one calm, searchable home.</p></div><div className="story-points"><article><span>01</span><h3>Discover</h3><p>Search by subject, semester, department, or tag and reach the right resource quickly.</p></article><article><span>02</span><h3>Organize</h3><p>Bookmark the material you need for revision and keep your personal study shelf close.</p></article><article><span>03</span><h3>Contribute</h3><p>Share useful resources, upvote what helps, and improve the collection for everyone.</p></article></div></section><section className="landing-features"><div><strong>01</strong><h2>Search simply</h2><p>Find resources by subject, semester, tag, or department.</p></div><div><strong>02</strong><h2>Study together</h2><p>Share helpful links and let the community surface the best ones.</p></div><div><strong>03</strong><h2>Make it yours</h2><p>Bookmark important material and build your personal study shelf.</p></div></section><footer className="landing-footer">Built for students, by students <span>·</span> Campus Resource Hub</footer></main>;
}

function AuthForm() {
  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async (event) => {
    event.preventDefault(); setBusy(true); setMessage('');
    const result = mode === 'signin'
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });
    setBusy(false);
    if (result.error) setMessage(result.error.message);
    else if (mode === 'signup') setMessage('Account created. Check your email if confirmation is enabled.');
  };
  return <main className="auth-screen"><section className="auth-card glass"><div className="auth-brand"><BookOpen size={28}/><span>CAMPUS<br/><b>RESOURCE HUB</b></span></div><div className="eyebrow">STUDENT ACCESS</div><h1>{mode === 'signin' ? 'Welcome back' : 'Create your account'}</h1><p className="auth-copy">Save your study resources and keep your personal collection organized.</p><form onSubmit={submit}><label>Email<input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="student@college.edu"/></label><label>Password<input type="password" required minLength="6" value={password} onChange={e=>setPassword(e.target.value)} placeholder="At least 6 characters"/></label>{message&&<p className="auth-message">{message}</p>}<button className="add auth-submit" disabled={busy}>{busy?<LoaderCircle className="spin" size={16}/>:mode==='signin'?<LogIn size={16}/>:<UserPlus size={16}/>} {mode==='signin'?'Sign in':'Create account'}</button></form><button className="auth-switch" onClick={()=>{setMode(mode==='signin'?'signup':'signin');setMessage('')}}>{mode==='signin'?'New student? Create an account':'Already registered? Sign in'}</button></section></main>;
}

function AuthUnavailable() { return <main className="auth-screen"><section className="auth-card glass"><BookOpen size={28}/><h1>Student accounts are not configured</h1><p className="auth-copy">Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable secure student sign-up and sign-in.</p></section></main>; }
