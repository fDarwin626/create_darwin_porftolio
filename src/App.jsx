import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import AboutServices from './sections/Services'
import PricingPreview from './sections/PricingPreview'
import Pricing from './sections/Pricing'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <AboutServices />
      <PricingPreview/>
      <Pricing/>
      <Contact />
      <Footer />
    </main>
  )
}

export default App