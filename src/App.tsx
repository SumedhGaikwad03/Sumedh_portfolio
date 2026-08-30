import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";
import PortfolioMascot from "./components/PortfolioMascot";
import PortfolioBoot from "./components/PortfolioBoot";
import ViewModeTransition from "./components/ViewModeTransition";
import KeyboardShortcutsModal from "./components/KeyboardShortcutsModal";
import { ViewModeProvider } from "./context/ViewModeContext";

const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));

function App() {
  return (
    <ViewModeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <PortfolioBoot />
        <ViewModeTransition />
        <KeyboardShortcutsModal />
        <div className="min-h-screen flex flex-col bg-[var(--color-bg)] bg-tech-grid text-[var(--color-ink)] selection:bg-[var(--color-accent-soft)] selection:text-[var(--color-accent)]">
          <PortfolioMascot />
          <Nav />
          <main className="flex-1">
            <Suspense
              fallback={
                <div className="min-h-[60vh] flex items-center justify-center font-mono text-xs text-[var(--color-slate-light)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-terminal)] animate-pulse mr-2" />
                  <span>INITIALIZING_DOSSIER_VIEW...</span>
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects/:slug" element={<ProjectDetail />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ViewModeProvider>
  );
}

export default App;
