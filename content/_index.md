# Leave the homepage title empty to use the site title
title: ""
date: 2022-10-24
type: landing

design:
  # Default section spacing
  spacing: "6rem"

sections:
  - block: resume-biography-3
    content:
      # Choose a user profile to display (a folder name within `content/authors/`)
      username: admin
      text: ""
      # Show a call-to-action button under your biography? (optional)
      button:
        text: Download CV
        url: uploads/resume.pdf
    design:
      css_class: dark hero-section
      background:
        color: "#2c2c2c"
        image:
          # Add your image background to `assets/media/`.
          filename: contours.jpg
          filters:
            brightness: 0.3
            contrast: 1.2
          size: cover
          position: center
          parallax: false
      css_style: |
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
        }
        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.7) 100%);
          z-index: 1;
        }
        .hero-section .container {
          position: relative;
          z-index: 2;
        }
        .hero-section h1 {
          font-size: 3.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
          margin-bottom: 1.5rem;
        }
        .hero-section p {
          font-size: 1.3rem;
          color: #e0e0e0;
          text-shadow: 0 1px 2px rgba(0,0,0,0.5);
          margin-bottom: 2rem;
          line-height: 1.6;
        }
        .hero-section .btn {
          background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
          border: 2px solid rgba(255,255,255,0.2);
          padding: 15px 35px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(74,144,226,0.3);
        }
        .hero-section .btn:hover {
          background: linear-gradient(135deg, #357abd 0%, #2868a3 100%);
          box-shadow: 0 6px 20px rgba(74,144,226,0.4);
          transform: translateY(-2px);
        }

  - block: markdown
    content:
      title: '📚 Research Focus'
      subtitle: 'Advancing Chemical Process Control Through Deep Learning'
      text: |-
          Max is a PhD student specializing in the application and development of deep reinforcement learning algorithms for chemical process control. His interdisciplinary approach combines cutting-edge AI methodologies with practical engineering solutions.
          
          **Academic Journey:** University of Edinburgh (Undergraduate) → Imperial College London (Masters) → Current PhD Research
          
          **Industry Experience:** Process Engineering Consultant with hands-on experience in real-world applications
          
          His research bridges the gap between theoretical machine learning advances and practical chemical engineering challenges, contributing to more efficient and sustainable industrial processes.
    design:
      columns: '1'
      css_class: research-section
      css_style: |
        .research-section {
          background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
          padding: 6rem 0;
          position: relative;
        }
        .research-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, #4a90e2 50%, transparent 100%);
        }
        .research-section h2 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 1rem;
          text-align: center;
        }
        .research-section h3 {
          font-size: 1.4rem;
          color: #4a90e2;
          text-align: center;
          margin-bottom: 3rem;
          font-weight: 500;
        }
        .research-section p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #34495e;
          max-width: 800px;
          margin: 0 auto 1.5rem;
        }
        .research-section strong {
          color: #2c3e50;
          font-weight: 600;
        }

  - block: collection
    content:
      title: Recent Publications
      subtitle: "Latest contributions to the field"
      text: ""
      filters:
        folders:
          - publication
        exclude_featured: false
    design:
      view: citation
      css_class: publications-section
      css_style: |
        .publications-section {
          background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%);
          padding: 5rem 0;
          position: relative;
        }
        .publications-section h2 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #2c3e50;
          text-align: center;
          margin-bottom: 1rem;
        }
        .publications-section h3 {
          font-size: 1.2rem;
          color: #7f8c8d;
          text-align: center;
          margin-bottom: 3rem;
          font-weight: 400;
        }
        .publications-section .card {
          border: none;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          border-radius: 12px;
          transition: all 0.3s ease;
          margin-bottom: 2rem;
        }
        .publications-section .card:hover {
          box-shadow: 0 8px 30px rgba(0,0,0,0.12);
          transform: translateY(-5px);
        }
      spacing:
        padding: [0, 0, 0, 0]

  - block: cta-card
    demo: true # Only display this section in the Hugo Blox Builder demo site
    content:
      title: 🚀 Build Your Academic Presence
      text: |-
        Create a professional academic website that showcases your research with the same elegant design principles demonstrated here.

        ⭐ **Hugo Blox Builder** - Trusted by 250,000+ academics worldwide
        
        🔧 **No-code required** - Build with intuitive blocks and components
        
        📊 **Research-focused** - Perfect for academic portfolios, publications, and project showcases
        
        Start building your academic brand today with modern, responsive designs that make your research stand out.
      button:
        text: Get Started
        url: https://hugoblox.com/templates/
    design:
      card:
        css_class: "cta-section"
        css_style: |
          .cta-section {
            background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
            border-radius: 16px;
            padding: 4rem 3rem;
            margin: 4rem 0;
            text-align: center;
            position: relative;
            overflow: hidden;
          }
          .cta-section::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></svg>');
            background-size: 30px 30px;
            animation: float 20s infinite linear;
            pointer-events: none;
          }
          @keyframes float {
            0% { transform: translateX(0) translateY(0); }
            100% { transform: translateX(-30px) translateY(-30px); }
          }
          .cta-section h2 {
            color: white;
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            position: relative;
            z-index: 2;
          }
          .cta-section p {
            color: rgba(255,255,255,0.95);
            font-size: 1.2rem;
            line-height: 1.7;
            margin-bottom: 2.5rem;
            position: relative;
            z-index: 2;
          }
          .cta-section .btn {
            background: white;
            color: #4a90e2;
            padding: 15px 40px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            border-radius: 50px;
            transition: all 0.3s ease;
            position: relative;
            z-index: 2;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
          }
          .cta-section .btn:hover {
            background: #f8f9fa;
            transform: translateY(-3px);
            box-shadow: 0 6px 25px rgba(0,0,0,0.3);
          }