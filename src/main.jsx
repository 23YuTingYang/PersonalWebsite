import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Aurora from './Aurora';
import SpotlightCard from './SpotlightCard';
import ShinyText from './ShinyText';
import VariableProximity from './VariableProximity';
import PillNav from './PillNav';
import ClickSpark from './ClickSpark';
import BorderGlow from './BorderGlow';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

const videoUrl =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4';

const auroraColorStops = ['#062f49', '#2bc7e8', '#f0b35a'];

const assetPath = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

const profile = {
  name: '杨毓庭',
  role: '软件测试工程师',
  phone: '151-1307-0746',
  email: 'yuting0746@163.com',
  school: '韩山师范学院（本科）',
  major: '计算机科学与技术',
};

const metrics = [
  { value: '56', label: '功能测试用例' },
  { value: '75', label: '接口自动化用例' },
  { value: '65', label: 'UI 自动化用例' },
  { value: '0%', label: '核心链路低并发错误率' },
];

const projects = [
  {
    title: 'AIWear 智能试衣与换装平台',
    type: 'Core QA Project',
    summary:
      'AIWear 面向线上服装选购场景，解决用户缺少直观试穿效果、服装筛选与搭配决策效率低的问题，支持图片上传、文搜图、图搜图、图片编辑、换装合成和历史记录管理，帮助用户更便捷地预览穿搭效果。',
    stack: ['Python', 'Pytest', 'Requests', 'Selenium', 'JMeter', 'Allure'],
    github: 'https://github.com/23YuTingYang/AIWear-test-platform',
    visual: 'project-art-aiwear',
  },
  {
    title: '接口自动化测试链路',
    type: 'API Automation',
    summary:
      '通过登录、验证码、文件上传、图片查询等依赖链路组织用例，结合参数化、上下文传递和断言策略提升回归效率。',
    stack: ['YAML', 'Jsonschema', 'pytest-order', 'Allure Report'],
    visual: 'project-art-api',
  },
  {
    title: 'UI 自动化与性能压测',
    type: 'UI & Performance',
    summary:
      '基于 Page Object 封装页面对象，并使用 JMeter 对核心接口和混合业务场景开展并发压测，定位稳定性风险。',
    stack: ['Page Object', 'WebDriverWait', 'JMeter CSV', 'HTML Report'],
    visual: 'project-art-performance',
  },
];

const aiwearDemos = [
  {
    title: '1. 登录与图片入口',
    src: assetPath('/demo/aiwear-login.webp'),
    alt: 'AIWear 登录页与图片编辑入口演示',
  },
  {
    title: '2. 图片编辑模块',
    src: assetPath('/demo/aiwear-editor.webp'),
    alt: 'AIWear 图片编辑和换装生成页面演示',
  },
  {
    title: '3. 输入编辑提示词',
    src: assetPath('/demo/aiwear-edit-prompt.webp'),
    alt: 'AIWear 图片编辑提示词输入演示',
  },
  {
    title: '4. 查看处理结果',
    src: assetPath('/demo/aiwear-edit-result.webp'),
    alt: 'AIWear 图片编辑处理结果演示',
  },
];

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Strengths', href: '#strengths' },
  { label: 'Contact', href: '#contact' },
];

const strengths = [
  ['测试设计', '能根据需求拆分等价类、边界值、场景链路和异常路径，形成可执行、可回归的测试用例。'],
  ['接口自动化', '熟悉 Pytest、Requests、YAML 数据驱动、上下文参数传递和报告输出，能覆盖核心接口链路。'],
  ['UI 自动化', '掌握 Selenium、Page Object、显式等待和隐藏上传控件处理，关注脚本稳定性和可维护性。'],
  ['性能测试', '能使用 JMeter 配置线程组、CSV 数据、HTTP 请求和断言，分析错误率、吞吐和响应时间。'],
  ['问题定位', '能结合前端现象、接口响应、日志、数据库和 Redis 状态协助定位缺陷边界。'],
  ['工程协作', '熟悉 Postman、Git、Linux、Fiddler、Allure 等工具，能输出清晰的测试记录和缺陷信息。'],
];

function Hero() {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    const loadVideo = () => setShouldLoadVideo(true);
    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(loadVideo, { timeout: 1600 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timerId = window.setTimeout(loadVideo, 900);
    return () => window.clearTimeout(timerId);
  }, []);

  return (
    <section id="home" className="hero">
      <video
        className="hero-video"
        src={shouldLoadVideo ? videoUrl : undefined}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      />
      <div className="hero-content">
        <h1>
          <span className="hero-title-mask">
            <span className="hero-title-line">
              <ShinyText
                text="Where quality rises"
                speed={3}
                color="#ffffff"
                shineColor="#c4c4c4"
                spread={100}
                pauseOnHover={false}
              />
            </span>
          </span>
          <br />
          <em>
            <span className="hero-title-mask">
              <span className="hero-title-line">
                <ShinyText
                  text="through every silent defect."
                  speed={3}
                  color="rgba(255, 255, 255, 0.54)"
                  shineColor="#d1d1d1"
                  spread={100}
                  pauseOnHover={false}
                />
              </span>
            </span>
          </em>
        </h1>
        <p>
          我是{profile.name}，求职方向为软件测试工程师。专注功能测试、接口自动化、UI 自动化与性能测试，把复杂业务拆成清晰、稳定、可验证的测试路径。
        </p>
        <a className="liquid-glass hero-button" href="#projects">
          Begin Journey
        </a>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="content-section intro-section">
      <div className="section-copy">
        <span>About Me</span>
        <h2>在安静的链路里，找到产品真正的质量信号。</h2>
      </div>
      <SpotlightCard
        className="intro-panel profile-spotlight"
        spotlightColor="rgba(43, 199, 232, 0.24)"
      >
        <div>
          <p className="panel-label">Profile</p>
          <h3>{profile.name} · {profile.role}</h3>
          <p>
            计算机科学与技术本科背景，主要实践方向是软件测试。熟悉黑盒测试、接口测试、UI 自动化测试和性能测试，能根据需求文档设计用例并完成测试执行、缺陷定位和报告输出。
          </p>
        </div>
        <dl className="contact-grid">
          <div><dt>Phone</dt><dd>{profile.phone}</dd></div>
          <div><dt>Email</dt><dd>{profile.email}</dd></div>
          <div><dt>School</dt><dd>{profile.school}</dd></div>
          <div><dt>Major</dt><dd>{profile.major}</dd></div>
        </dl>
      </SpotlightCard>
      <div className="metric-row">
        {metrics.map((item) => (
          <BorderGlow
            key={item.label}
            edgeSensitivity={30}
            glowColor="40 80 80"
            backgroundColor="#2a393e"
            borderRadius={28}
            glowRadius={40}
            glowIntensity={1.0}
            coneSpread={25}
            animated={false}
            colors={['#c084fc', '#f472b6', '#38bdf8']}
            fillOpacity={0.32}
            className="metric-card"
          >
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </BorderGlow>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (!previewImage) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setPreviewImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewImage]);

  return (
    <section id="projects" className="content-section">
      <div className="section-copy center">
        <span>Selected Work</span>
        <h2>精选项目</h2>
      </div>
      <div className="project-grid">
        {projects.map((project, index) => (
          <React.Fragment key={project.title}>
            <article className="project-card">
              <div className={`project-art ${project.visual}`}>
                <b>{String(index + 1).padStart(2, '0')}</b>
                <i />
                <i />
                <i />
              </div>
              <div className="project-info">
                <span>{project.type}</span>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                {project.github ? (
                  <a
                    className="project-link"
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub 项目地址
                  </a>
                ) : null}
                <div className="tag-row">
                  {project.stack.map((tag) => <em key={tag}>{tag}</em>)}
                </div>
              </div>
            </article>
            {index === 0 ? (
              <section className="project-demo" aria-label="AIWear 项目演示">
                <div className="project-demo-copy">
                  <span>Demo Preview</span>
                  <h3>从登录入口到编辑结果，展示真实业务流程。</h3>
                  <p>
                    这里展示 AIWear 的核心使用路径：用户登录后进入图片编辑模块，上传人物图片，输入编辑需求，系统生成处理结果，体现平台面向线上试衣、图片编辑和穿搭预览的实际应用场景。
                  </p>
                </div>
                <div className="demo-shot-row">
                  {aiwearDemos.map((demo) => (
                    <figure className="demo-shot" key={demo.title}>
                      <button
                        type="button"
                        className="demo-shot-button"
                        onClick={() => setPreviewImage(demo)}
                        aria-label={`查看完整图片：${demo.title}`}
                      >
                        <img src={demo.src} alt={demo.alt} loading="lazy" decoding="async" />
                      </button>
                      <figcaption>{demo.title}</figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            ) : null}
          </React.Fragment>
        ))}
      </div>
      {previewImage ? (
        <div
          className="image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={previewImage.title}
          onClick={() => setPreviewImage(null)}
        >
          <div className="image-lightbox-inner" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="image-lightbox-close"
              onClick={() => setPreviewImage(null)}
              aria-label="关闭图片预览"
            >
              X
            </button>
            <img src={previewImage.src} alt={previewImage.alt} decoding="async" />
            <p>{previewImage.title}</p>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function Strengths() {
  return (
    <section id="strengths" className="content-section">
      <div className="section-copy">
        <span>Strengths</span>
        <h2>个人优势</h2>
      </div>
      <div className="strength-grid">
        {strengths.map(([title, text]) => (
          <article className="glass-panel strength-card" key={title}>
            <small />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const containerRef = useRef(null);

  return (
    <section id="contact" className="contact-section">
      <img
        className="contact-image"
        src={assetPath('/contact-release-garden.webp')}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />
      <div className="contact-content" ref={containerRef}>
        <h2 style={{ position: 'relative', display: 'inline' }}>
          <VariableProximity
            label="Let quality speak before users complain."
            className="variable-proximity-demo"
            fromFontVariationSettings="'wght' 100, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={containerRef}
            radius={120}
            falloff="linear"
          />
        </h2>
        <p>期待加入重视质量与效率的团队，用扎实测试基础、自动化实践和问题定位能力，为产品稳定性提供确定性。</p>
        <div className="contact-actions">
          <a className="liquid-glass" href={`mailto:${profile.email}`}>{profile.email}</a>
          <a className="liquid-glass" href={`tel:${profile.phone}`}>{profile.phone}</a>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState('#home');
  const activeSectionRef = useRef('#home');

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;

    const ctx = gsap.context(() => {
      gsap.set('.hero-video', {
        scale: 1.16,
        filter: 'brightness(0.52) saturate(0.72)',
        transformOrigin: '50% 52%',
      });
      gsap.set('.hero-title-line', {
        yPercent: 120,
        scaleY: 0.58,
        opacity: 0,
        transformOrigin: '50% 100%',
      });
      gsap.set('.hero-content p', { y: 46, opacity: 0, filter: 'blur(12px)' });
      gsap.set('.hero-button', { y: 34, opacity: 0, scaleX: 0.72, transformOrigin: '50% 50%' });
      const opening = gsap.timeline({ defaults: { ease: 'expo.out' } });
      opening
        .to('.hero-video', {
          scale: 1,
          filter: 'brightness(0.82) saturate(0.95)',
          duration: 2.2,
        })
        .to('.hero-title-line', {
          yPercent: 0,
          scaleY: 1,
          opacity: 1,
          duration: 1.55,
          stagger: 0.18,
        }, 0.32)
        .to('.hero-content p', {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.25,
        }, 0.94)
        .to('.hero-button', {
          y: 0,
          opacity: 1,
          scaleX: 1,
          duration: 1.1,
          ease: 'power4.out',
        }, 1.18);

      gsap.utils.toArray('.content-section').forEach((section) => {
        const eyebrow = section.querySelector('.section-copy span');
        const heading = section.querySelector('.section-copy h2');
        const cards = section.querySelectorAll(
          '.profile-spotlight, .metric-card, .project-card, .project-demo, .strength-card'
        );

        if (eyebrow) {
          gsap.from(eyebrow, {
            scrollTrigger: {
              trigger: section,
              start: 'top 72%',
              toggleActions: 'play none none reverse',
            },
            y: 34,
            opacity: 0,
            letterSpacing: '0.46em',
            duration: 0.9,
            ease: 'power3.out',
          });
        }

        if (heading) {
          gsap.from(heading, {
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
            y: 110,
            x: -34,
            scale: 1.18,
            opacity: 0,
            filter: 'blur(16px)',
            duration: 1.25,
            ease: 'expo.out',
          });
        }

        if (cards.length) {
          gsap.from(cards, {
            scrollTrigger: {
              trigger: section,
              start: 'top 62%',
              toggleActions: 'play none none reverse',
            },
            y: 88,
            opacity: 0,
            rotateX: -7,
            filter: 'blur(10px)',
            transformOrigin: '50% 0%',
            duration: 1.05,
            stagger: 0.13,
            ease: 'power4.out',
          });
        }
      });

      gsap.utils.toArray('.project-art, .demo-shot, .contact-image').forEach((media) => {
        gsap.fromTo(media,
          { clipPath: 'inset(18% 0% 18% 0%)', scale: 1.08, filter: 'brightness(0.72)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            scale: 1,
            filter: 'brightness(1)',
            duration: 1.35,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: media,
              start: 'top 78%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      gsap.utils.toArray('.project-art, .demo-shot img, .contact-image').forEach((media) => {
        gsap.to(media, {
          yPercent: -7,
          ease: 'none',
          scrollTrigger: {
            trigger: media,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let frameId = 0;

    const updateNavState = () => {
      const navAnchor = window.innerHeight * 0.55;
      const current = navItems.reduce((best, item) => {
        const sectionId = item.href.replace('#', '');
        const section = document.getElementById(sectionId);
        if (!section) return best;

        const rect = section.getBoundingClientRect();
        const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;
        if (!isVisible) return best;

        const score = Math.abs(rect.top - navAnchor);
        if (!best || score < best.score) {
          return { item, score };
        }

        return best;
      }, null);

      const nextActive = current?.item?.href ?? '#home';
      if (nextActive !== activeSectionRef.current) {
        activeSectionRef.current = nextActive;
        setActiveSection(nextActive);
      }
    };

    const scheduleNavStateUpdate = () => {
      if (frameId) return;
      frameId = requestAnimationFrame(() => {
        frameId = 0;
        updateNavState();
      });
    };

    updateNavState();
    window.addEventListener('scroll', scheduleNavStateUpdate, { passive: true });
    window.addEventListener('resize', scheduleNavStateUpdate);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', scheduleNavStateUpdate);
      window.removeEventListener('resize', scheduleNavStateUpdate);
    };
  }, []);

  return (
    <ClickSpark
      sparkColor="rgba(43, 199, 232, 0.8)"
      sparkSize={12}
      sparkRadius={25}
      sparkCount={10}
      duration={500}
      easing="ease-out"
    >
      <PillNav
        logo={assetPath('/logo.svg')}
        logoAlt="Yuting"
        items={navItems}
        activeHref={activeSection}
        baseColor="rgba(3, 20, 30, 0.5)"
        pillColor="rgba(255, 255, 255, 0.08)"
        hoveredPillTextColor="#ffffff"
        pillTextColor="rgba(255, 255, 255, 0.7)"
        ease="power2.easeOut"
        initialLoadAnimation
      />
      <Hero />
      <main>
        <div className="middle-aurora" aria-hidden="true">
          <Aurora
            colorStops={auroraColorStops}
            blend={0.42}
            amplitude={0.72}
            speed={0.34}
          />
        </div>
        <Experience />
        <Projects />
        <Strengths />
        <Contact />
      </main>
    </ClickSpark>
  );
}

const rootElement = document.getElementById('root');
const root = window.__portfolioRoot ?? createRoot(rootElement);
window.__portfolioRoot = root;
root.render(<App />);
