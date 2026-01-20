 export  const categories = {
    brand: {
      title: 'Brand Identity',
      subtitle: 'Establish your brand with professional logos, colors, typography, and strategy.',
      packages: [
        {
          name: 'Hatchling',
          tagline: 'Starter Identity',
          price: '$200',
          features: [
            'Primary logo design',
            'Simplified icon version',
            'Brand color palette (3–4 colors)',
            'Typography pairing',
            '1-page logo usage guide',
            'Social media profile logos (4 platforms)',
            'Multiple file formats',
            'Editable source files',
            '3 basic mockups',
            '2 revision rounds',
            '5–7 business days delivery'
          ],
          popular: false
        },
        {
          name: 'Fledgling',
          tagline: 'Brand Essentials',
          price: '$500',
          features: [
            'Primary + Secondary logo',
            'Simplified icon version',
            'Expanded color palette (6–8 colors)',
            'Complete typography system',
            'Brand tone & personality summary',
            '2-page logo usage guide',
            'Mini brand board',
            '3 editable social templates',
            '6 premium mockups',
            'Multiple file formats',
            '3 revision rounds',
            '10–14 business days delivery'
          ],
          popular: true
        },
        {
          name: 'Alpha',
          tagline: 'Brand & Launch System',
          price: '$3,000',
          features: [
            'Complete brand identity suite',
            '2 secondary logo variations',
            'Comprehensive color palette (8–12 colors)',
            'Complete typography system',
            '60-minute brand strategy session',
            'Full brand guidelines (20–35 pages)',
            'Custom website design (4 pages)',
            '5 editable social templates',
            '12 premium mockups',
            'Social media launch strategy',
            '4 revision rounds',
            '4–6 weeks delivery'
          ],
          popular: false
        }
      ]
    },
    social: {
      title: 'Social Media Design',
      subtitle: 'Consistent, branded content to keep your audience engaged.',
      packages: [
        {
          name: 'Sprout',
          tagline: 'Starter Content',
          price: '$200',
          period: '/month',
          features: [
            '20 social media graphics/month',
            'Platform-optimized formats',
            '4 content themes/categories',
            'Editable source files',
            'Basic caption style guide',
            'Brand consistency check',
            '2 revision rounds/month',
            'Monthly delivery by 5th'
          ],
          popular: false
        },
        {
          name: 'Branch',
          tagline: 'Essential Content',
          price: '$500',
          period: '/month',
          features: [
            '30 social media graphics/month',
            '1 short video edit/month',
            '5 branded carousel templates',
            '6 Reels/Stories cover templates',
            'Content layout guide',
            'Caption style guide',
            '6 content themes/categories',
            '3 revision rounds/month',
            'Graphics by 5th, video by 10th'
          ],
          popular: true
        },
        {
          name: 'Tree',
          tagline: 'Pro Content',
          price: '$1,000',
          period: '/month',
          features: [
            '50 social media graphics/month',
            '3 short video edits/month',
            'Multi-platform optimization (4 platforms)',
            'Monthly content calendar',
            '8 branded carousel templates',
            '10 Reels/Stories cover templates',
            'Advanced template suite (15 templates)',
            'Advanced captioning guide',
            '8 content themes/categories',
            '3 revision rounds/month'
          ],
          popular: false
        }
      ]
    },
    video: {
      title: 'Video Content',
      subtitle: 'Professional video edits to boost engagement and grow your audience.',
      packages: [
        {
          name: 'Hatchling Video',
          tagline: 'Starter',
          price: '$700',
          period: '/month',
          features: [
            '2 short video edits/month (15–30 sec)',
            'Platform-optimized (4 platforms)',
            'Basic editing: cuts, transitions, text',
            '2 branded lower-third templates',
            'Editable source files',
            'Brand consistency check',
            '2 revision rounds/video',
            'Delivery: 10th & 25th'
          ],
          popular: false
        },
        {
          name: 'Fledgling Video',
          tagline: 'Essential',
          price: '$1,200',
          period: '/month',
          features: [
            '4 short video edits/month (15–60 sec)',
            'Multi-platform optimized (5 platforms)',
            'Advanced editing + color grading',
            '4 branded video templates',
            'Caption + CTA guide',
            'Subtitles for all videos',
            '3 revision rounds/video',
            '1 video per week delivery'
          ],
          popular: true
        },
        {
          name: 'Alpha Video',
          tagline: 'Pro',
          price: '$2,000',
          period: '/month',
          features: [
            '8 short video edits/month (15–60 sec)',
            'Multi-platform optimized (6 platforms)',
            'Premium editing + motion graphics',
            '8 branded video templates',
            'Comprehensive caption guide',
            'Custom styled subtitles',
            'Advanced template suite (15 templates)',
            'Monthly video content calendar',
            '3 revision rounds/video',
            '2 videos/week (Tue & Fri)'
          ],
          popular: false
        }
      ]
    },
    bundle: {
      title: 'Full Management',
      subtitle: `Stop juggling posts, videos, and engagement yourself. Our All-in-One packages keep your
        brand consistent, active, and growing while you focus on your business. From content
        creation to daily posting and community management, we handle everything so your brand
         stays top of mind with your audience.`,
      packages: [
        {
          name: 'Sprout Plus',
          tagline: 'Starter Bundle',
          price: '$700',
          period: '/month',
          features: [
            '20 graphics + 2 videos/month',
            'Platform-optimized (4 platforms)',
            'Caption style guide',
            '4 content themes',
            '1 platform management',
            'Content scheduling (20 posts)',
            'Basic community engagement (3x/week)',
            'Monthly performance report',
            '2 revision rounds/month'
          ],
          popular: false
        },
        {
          name: 'Branch Plus',
          tagline: 'Growth Bundle',
          price: '$1,200',
          period: '/month',
          features: [
            '30 graphics + 4 videos/month',
            '5 carousel + 6 Reels templates',
            'Content layout guide',
            '6 content themes',
            '2 platforms management',
            'Content scheduling (30 posts total)',
            'Daily community engagement',
            'Hashtag research & implementation',
            'Story posting (8/month per platform)',
            'Detailed analytics report (3 pages)'
          ],
          popular: true
        },
        {
          name: 'Tree Plus',
          tagline: 'Pro Bundle',
          price: '$2,500',
          period: '/month',
          features: [
            '50 graphics + 8 videos/month',
            'Multi-platform optimization (5+)',
            'Monthly content calendar',
            '8 carousel + 10 Reels templates',
            '3 platforms management',
            'Content scheduling (50 posts)',
            'Premium engagement (2hr response)',
            'Hashtag strategy & research',
            'Story posting (12/month per platform)',
            'Detailed analytics (10 pages)',
            'Quarterly competitor analysis',
            'Influencer outreach (2/month)'
          ],
          popular: false
        }
      ]
    }
  }
