import React, { useState } from 'react';
import { Button } from '../components/UI';
import { Users, PieChart, Cpu, Rocket, ChevronRight, X, Loader2 } from 'lucide-react';
import { AuthService } from '../services/AuthService';

// Foundry Logo Component for reuse (PNG-based)
const FoundryLogo = () => (
  <div className="w-10 h-10 flex items-center justify-center">
    <img
      src="/images/foundry-icon.png"  // relative to public/
      alt="Foundry Logo"
      className="w-full h-full object-contain"
    />
  </div>
);

export default FoundryLogo;

export const LandingPage: React.FC<{ onEnterApp: () => void }> = ({ onEnterApp }) => {
  const [authMode, setAuthMode] = useState<'login' | 'signup' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form State for Validation
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const openLogin = () => {
    setAuthMode('login');
    setFullName('');
    setEmail('');
    setPassword('');
    setErrorMsg(null);
  };

  const openSignup = () => {
    setAuthMode('signup');
    setFullName('');
    setEmail('');
    setPassword('');
    setErrorMsg(null);
  };

  const closeAuth = () => {
    setAuthMode(null);
    setErrorMsg(null);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      if (authMode === 'signup') {
        // Create new user, step 1 of onboarding
        await AuthService.signup(fullName, email);
      } else {
        // Login existing user, retrieve workspace data
        await AuthService.login(email);
      }

      onEnterApp();
    } catch (error: any) {
      console.error("Auth failed", error);
      setErrorMsg(error.message || "Authentication failed. Please check your credentials.");

      // If 404/User not found, maybe suggest signup?
      if (error.message && error.message.includes("404")) {
        setErrorMsg("Account not found. Please sign up first.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    console.log("Google Login Clicked");
    setIsLoading(true);
    try {
      // Must match seeded user email for now
      const user = await AuthService.googleSignup("indra094@gmail.com");
      console.log("Google Signup Success:", user);
      setIsLoading(false);
      onEnterApp();
    } catch (e) {
      console.error("Google Signup Failed:", e);
      alert("Google Login failed: Account must exist in database.");
      setIsLoading(false);
    }
  };

  const isSignup = authMode === 'signup';

  const isFormValid = isSignup
    ? fullName.trim() !== '' && email.trim() !== '' && password.trim() !== ''
    : email.trim() !== '' && password.trim() !== '';

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Auth Modal Overlay */}
      {authMode && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-400/20 backdrop-blur-sm animate-in fade-in duration-200" onClick={closeAuth}>
          <div className="min-h-full flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={closeAuth}
                disabled={isLoading}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8 pt-10">
                <div className="text-center mb-8">
                  <div className="inline-flex justify-center mb-4 transform scale-125"><FoundryLogo /></div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {isSignup ? 'Create your account' : 'Welcome back'}
                  </h2>
                  <p className="text-slate-500 mt-2 text-sm">
                    {isSignup ? 'Start building your startup operating system' : 'Log in to your Foundry workspace'}
                  </p>
                </div>

                <button
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-3 bg-white border border-slate-300 text-slate-700 font-bold h-12 rounded-xl hover:bg-slate-50 hover:border-slate-400 hover:shadow-sm transition-all mb-6 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
                  ) : (
                    <>
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      <span className="group-hover:text-slate-900">
                        {isSignup ? 'Sign up with Google' : 'Continue with Google'}
                      </span>
                    </>
                  )}
                </button>

                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                  <div className="relative flex justify-center text-xs uppercase tracking-wide font-semibold"><span className="px-3 bg-white text-slate-400">Sign in with email</span></div>
                </div>



                {errorMsg && (
                  <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg flex items-start gap-2">
                    <span className="mt-0.5">⚠️</span>
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleAuthSubmit} className="space-y-4">
                  {isSignup && (
                    <div className="space-y-1 animate-in slide-in-from-top-2 duration-200">
                      <label className="block text-sm font-semibold text-slate-700 ml-1">Full Name</label>
                      <input
                        type="text"
                        required
                        disabled={isLoading}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Jane Founder"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 disabled:bg-slate-50 disabled:text-slate-500"
                      />
                    </div>
                  )}
                  <div className="space-y-1">
                    <label className="block text-sm font-semibold text-slate-700 ml-1">Email</label>
                    <input
                      type="email"
                      required
                      disabled={isLoading}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 disabled:bg-slate-50 disabled:text-slate-500"
                      autoFocus={!isSignup}
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between ml-1">
                      <label className="block text-sm font-semibold text-slate-700">Password</label>
                      {!isSignup && <a href="#" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">Forgot?</a>}
                    </div>
                    <input
                      type="password"
                      required
                      disabled={isLoading}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 disabled:bg-slate-50 disabled:text-slate-500"
                    />
                  </div>
                  <Button
                    fullWidth
                    disabled={isLoading || !isFormValid}
                    className="h-12 text-base shadow-lg shadow-indigo-200/50 mt-2 flex items-center justify-center gap-2"
                  >
                    {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                    {isSignup ? 'Create Account' : 'Log In'}
                  </Button>
                </form>

                <div className="mt-6 text-center text-sm text-slate-500">
                  {isSignup ? (
                    <>Already have an account? <button onClick={openLogin} disabled={isLoading} className="text-indigo-600 font-semibold hover:underline disabled:opacity-50">Log in</button></>
                  ) : (
                    <>Don't have an account? <button onClick={openSignup} disabled={isLoading} className="text-indigo-600 font-semibold hover:underline disabled:opacity-50">Sign up</button></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={scrollToTop}>
            <FoundryLogo />
            <span className="text-xl font-bold tracking-tight">Foundry</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={openLogin} className="text-sm font-medium text-slate-600 hover:text-indigo-600 hidden md:block">Log in</button>
            <Button onClick={openSignup} className="rounded-full px-6">Sign Up</Button>
          </div>
        </div>
      </header>

      {/* Hero and other sections remain same... */}
      <section className="pt-20 pb-32 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            New: Founder Alignment Engine
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6">
            Align, Decide, <span className="text-indigo-600">Act.</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Make founder decisions clear before they become expensive.
            Foundry is the operating system for early-stage alignment, equity modeling, and diligence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button onClick={openSignup} className="h-14 px-8 text-lg rounded-full w-full sm:w-auto shadow-lg shadow-indigo-200">
              Get Started
            </Button>
            <button onClick={openSignup} className="h-14 px-8 text-lg font-medium text-slate-600 hover:text-slate-900 flex items-center gap-2">
              See how it works <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="container mx-auto max-w-6xl mt-16 relative">
          <div className="absolute inset-0 bg-indigo-600/5 blur-3xl rounded-full transform scale-90 translate-y-10"></div>
          <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden aspect-video flex items-center justify-center bg-slate-50">
            <div className="text-center p-8">
              <div className="mb-4 flex justify-center text-indigo-200"><PieChart className="w-16 h-16" /></div>
              <h3 className="text-lg font-semibold text-slate-400">Interactive Founder Dashboard</h3>
              <p className="text-slate-400 text-sm">Equity Splits • Decision Gates • Cap Table Modeling</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to incorporate with confidence</h2>
            <p className="text-lg text-slate-600">Don't let legal ambiguity kill your startup. Foundry handles the hard conversations for you.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Users, title: "Founder Alignment", desc: "Structured questionnaires to align on vision, roles, and exit strategy." },
              { icon: PieChart, title: "Smart Equity", desc: "Dynamic equity splitting based on contribution, risk, and time commitment." },
              { icon: Cpu, title: "AI Council", desc: "Simulate board meetings and get unbiased advice on critical decisions." },
              { icon: Rocket, title: "Incorporation Ready", desc: "Generate legal-ready documents once you hit your alignment milestones." },
              { icon: ChevronRight, title: "Decision Gates", desc: "Track progress through Stage Gates from idea to Series A." },
              { icon: Users, title: "Team Management", desc: "Manage early employees, vesting schedules, and offer letters." }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© 2026 Foundry Inc. Building the future of company building.</p>
        </div>
      </footer>
    </div >
  );
};
