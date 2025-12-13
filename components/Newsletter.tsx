'use client';

export function Newsletter() {
  return (
    <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
      <input 
        type="email" 
        placeholder="Enter your email" 
        className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
      />
      <button 
        type="submit"
        className="bg-white text-primary rounded-full px-8 py-3 font-medium hover:bg-gray-100 transition-colors"
      >
        Subscribe
      </button>
    </form>
  );
}
