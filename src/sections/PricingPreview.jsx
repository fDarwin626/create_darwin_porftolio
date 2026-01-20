import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import AnimatedTitle from "../components/AnimatedTitle"

gsap.registerPlugin(ScrollTrigger);

const PricingPreview = () => {

        useGSAP(() => {
       const clipAnimation = gsap.timeline({
        scrollTrigger: {
            trigger: '#clip',
            start: 'center center',
            end: '+=800 center',
            scrub: 0.5,
            pin: true,
            pinSpacing:true,
        }
       })
       clipAnimation.to('.mask-clip-path', {
         width: '100vw',
         height: '100vh',
         borderRadius:0,
       })
    })

  return (
        <div id="about" className="min-h-screen w-screen ">
        <div className="relative mb-16 pt-40 flex flex-col items-center gap-8">
        <AnimatedTitle
          title="Awaken your Brands true potential"
          containerClass='text-center'
         />


                 <div className="about-subtext">
            <p>
                Establish your brand with Professional and pulished brand identity, social media management and video graphy
            </p>
            <p>
                In Create Darwin we help businesses and individuals
                 to evolve their brands to the next level.
            </p>
         </div>
        </div>

        <div className="h-dvh w-screen" id="clip">
            <div className="mask-clip-path about-image">
                <img
                    src="/images/brand.jpg"
                    alt="background image"
                    className="absolute left-0 top-0 size-full
                    object-cover"
                />
            </div>

     </div>
     </div>
  )
}

export default PricingPreview