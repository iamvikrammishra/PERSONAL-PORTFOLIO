import Head from "next/head";
import Link from "next/link";
import { FaTwitter } from "react-icons/fa";
import { LiaBasketballBallSolid } from "react-icons/lia";
import { GrLinkedinOption } from "react-icons/gr";
import { FaGithub } from "react-icons/fa";
import { BiDownload } from "react-icons/bi";
import { GoArrowUpRight } from "react-icons/go";
import { useEffect, useState } from "react";
import { LuMedal } from "react-icons/lu";
import { PiGraduationCap } from "react-icons/pi";
import { FaCalendarDays, FaInstagram } from "react-icons/fa6";
import Spinner from "@/components/Spinner";
import Typed from 'typed.js';

export default function Home() {


  // activeservice background color
  const [activeIndex, setActiveIndex] = useState(0);

  const handleHover = (index) => {
    setActiveIndex(index);
  };

  const handleMouseOut = () => {
    setActiveIndex(0); // Set the first item as active when mouse leaves
  };




  // services data
  const services = [
    {
      title: "Web Development",
      description: "I am very good in web development offering services, I offer reliable web development services to generate the most remarkable results which your business need."
    },
    {
      title: "Mobile Development",
      description: "Experienced mobile developer offering innovative solutions. Proficient in creating high-performance, user-centric mobile apps. Expertise in iOS, Android, and cross-platform development."
    },
    {
      title: "Digital Marketing(SEO)",
      description: "My digital marketing services will take your business to the next level, we offer remarkable digital marketing strategies that drives traffic to your website, your business, and improves your brand awareness to potential customers."
    },
    {
      title: "Content Creator",
      description: "Passionate photographer and videographer capturing moments with creativity. Transforming visions into visual stories. Expert in visual storytelling, skilled in both photography and videography to deliver captivating content."
    }
  ];

  const [loading, setLoading] = useState(true);
  const [alldata, setAllData] = useState([]);
  const [allwork, setAllWork] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsResponse, blogsResponse] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/blogs')
        ]);

        const projectsData = await projectsResponse.json();
        const blogsData = await blogsResponse.json();

        setAllData(projectsData);
        setAllWork(blogsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter projects based on selectedCategory
    if (selectedCategory === 'All') {
      setFilteredProjects(alldata.filter(pro => pro.status === 'publish'));
    } else {
      setFilteredProjects(alldata.filter(pro => pro.status === 'publish' && pro.projectcategory[0] === selectedCategory));
    }
  }, [selectedCategory, alldata]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };



  // Function to format the date as "20 May 2024 14:11 pm"
  const formatDate = (date) => {
    // Check if date is valid
    if (!date || isNaN(date)) {
      return ''; // or handle the error as needed
    }

    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour12: true // Use 12-hour format
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDarkMode(document.body.classList.contains('dark'));
    }
  }, []);


  // type js

  useEffect(() => {
    const options = {
      strings: ['UX Designer', 'Full Stack Dev', 'Backend Dev +'],
      typeSpeed: 50,
      backSpeed: 25,
      backDelay: 1000,
      startDelay: 500,
      loop: true,
    };

    const typedElement = document.querySelector('.typed-text');
    if (typedElement) {
      const typed = new Typed(typedElement, options);

      // Clean up on unmount
      return () => {
        typed.destroy();
      };
    }
  }, []);



  return (
    <>
      <Head>
        <title>thevkmcoder - Personal Portfolio</title>
        <meta name="description" content="vbmcoder - Personal Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
      </Head>

      {/* hero section */}
      <section className="hero">
        <div className="intro_text">
          <svg viewBox="0 0 1320 300">
            <text x="50%" y="50%" text-anchor="middle" className="animate-stroke">HI</text>
          </svg>
        </div>
        <div className="container">
          <div className="flex w-100">
            <div className="heroinfoleft">
              <span className="hero_sb_title" data-aos="fade-right" >I'm Vikram Mishra</span>
              <h1 className="hero_title" data-aos="fade-right" >Web Developer + <br /> <span className="typed-text">UX Designer</span> </h1>
              <div className="hero_img_box heroimgbox" data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000">
                <img src="/img/me.jpg" alt="" />
              </div>
              <div className="lead" data-aos="fade-up"  >I break down complex user experinece problems to create integritiy focussed solutions that connect lakhs of people</div>
              <div className="hero_btn_box" data-aos="fade-up">
                <Link href='/' download={'/img/resume.pdf'} className="download_cv">Download CV <BiDownload /></Link>
                <ul className="hero_social">
                  <li><a href="https://x.com/thevkmcoder"><FaTwitter /></a></li>
                  <li><a href="https://www.instagram.com/thevkmcoder/?next=%2F&hl=en"><FaInstagram /></a></li>
                  <li><a href="https://www.linkedin.com/in/vikram-mishra-8545aa1a4/"><GrLinkedinOption /></a></li>
                  <li><a href="https://github.com/iamvikrammishra/iamvkmishra"><FaGithub /></a></li>
                </ul>
              </div>
            </div>
            <div className="heroimageright" >
              <div className="hero_img_box" data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000">
                <img src='/img/me.png' alt="" />
              </div>
            </div>
          </div>
          <div className="funfect_area flex flex-sb">
            <div className="funfect_item" data-aos="fade-right">
              <h3>1+</h3>
              <h4>Years of <br />
                Experience</h4>
            </div>
            <div className="funfect_item" data-aos="fade-right">
              <h3>10+</h3>
              <h4>Projects <br />
                Completed</h4>
            </div>
            <div className="funfect_item" data-aos="fade-left">
              <h3>5+</h3>
              <h4>OpenSource <br />
                contribution</h4>
            </div>
            <div className="funfect_item" data-aos="fade-left">
              <h3>7+</h3>
              <h4>Happy <br />
                Customers</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services">
        <div className="container">
          <div className="services_titles">
            <h2 data-aos="fade-up">My Quality Services</h2>
            <p data-aos="fade-up">We put your ideas and thus your wishes in the form of a unique web project that inspires you and you customers.</p>
          </div>
          <div className="services_menu" data-aos="fade-up">
            {services.map((service, index) => (
              <div
                key={index}
                className={`services_item ${activeIndex === index ? 'sactive' : ''}`}
                onMouseOver={() => handleHover(index)}
                onMouseOut={handleMouseOut}
              >
                <div className="left_s_box">
                  <span>0{index + 1}</span>
                  <h3>{service.title}</h3>
                </div>
                <div className="right_s_box">
                  <p>{service.description}</p>
                </div>
                <GoArrowUpRight />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="projects">
        <div className="container">
          <div className="project_titles">
            <h2 data-aos="fade-up">My Recent Works</h2>
            <p data-aos="fade-up">We put your ideas and thus your wishes in the form of a unique web project that inspires you and you customers.</p>
          </div>
          <div className="project_buttons" data-aos="fade-zoom-in"
            data-aos-easing="ease-in-back"
            data-aos-delay="300"
            data-aos-offset="0">
            <button className={selectedCategory === 'All' ? 'active' : ''} onClick={() => setSelectedCategory('All')}>All</button>
            <button className={selectedCategory === 'Website Development' ? 'active' : ''} onClick={() => setSelectedCategory('Website Development')}>Website</button>
            <button className={selectedCategory === 'App Development' ? 'active' : ''} onClick={() => setSelectedCategory('App Development')}>Apps</button>
            <button className={selectedCategory === 'E-commerce site' ? 'active' : ''} onClick={() => setSelectedCategory('E-commerce site')}>Digital</button>
            <button className={selectedCategory === 'Perfomance Evaluation' ? 'active' : ''} onClick={() => setSelectedCategory('Perfomance Evaluation')}>Content</button>
          </div>
          <div className="projects_cards">
            {loading ? <Spinner /> : (
              filteredProjects.length === 0 ? (
                <h1 className="w-100 flex flex-center mt-3">No Projects Found</h1>
              ) : (
                filteredProjects.slice(0, 4).map((pro) => (
                  <Link href={`/projects/${pro.slug}`} key={pro._id} className="procard" data-aos="flip-left"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="2000">
                    <div className="proimgbox">
                      <img src={pro.images[0]} alt={pro.title} />
                    </div>
                    <div className="procontentbox">
                      <h2>{pro.title}</h2>
                      <GoArrowUpRight />
                    </div>
                  </Link>
                ))
              )
            )}

          </div>
        </div>
      </section>

      {/* Experience study */}
      <section className="exstudy">
        <div className="container flex flex-left flex-sb">
          <div className="experience">
            <div className="experience_title flex gap-1" data-aos="fade-right">
              <LuMedal />
              <h2>My Experience</h2>
            </div>
            <div className="exper_cards">
              <div className="exper_card" data-aos="fade-up">
                <span>Jan2024 - Present</span>
                <h3>Freelancer.</h3>
                <p>Full Stack Developer</p>
              </div>
              <div className="exper_card" data-aos="fade-up">
                <span>June2024-Aug2024</span>
                <h3>SoftwareGiant</h3>
                <p>Front-End Developer(Internship)</p>
              </div>
              <div className="exper_card" data-aos="fade-up">
                <span>Dec2024-Present</span>
                <h3>B&YA</h3>
                <p>Full-Stack Developer</p>
              </div>
              {/* <div className="exper_card" data-aos="fade-up">
                <span>2021-2024</span>
                <h3>LEAD DEVELOPER</h3>
                <p>Blockdots, United State</p>
              </div> */}
            </div>
          </div>
          <div className="education">
            <div className="experience_title flex gap-1" data-aos="fade-left">
              <PiGraduationCap />
              <h2>My Education</h2>
            </div>
            <div className="exper_cards">
              <div className="exper_card" data-aos="fade-up">
                <span>2018 - 2020</span>
                <h3>ISC MATHEMATICS</h3>
                <p>Rk College Madhubani</p>
              </div>
              <div className="exper_card" data-aos="fade-up">
                <span>2021-2025</span>
                <h3>Degree in Computer Science (AI/ML)</h3>
                <p>Dr. Apj Abdul Kalam Technical University.</p>
                
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Skills */}
      <section className="myskills">
        <div className="container">
          <div className="myskills_title">
            <h2 data-aos="fade-up">My Skills</h2>
            <p data-aos="fade-up">We put your ideas and thus your wishes in the form of a unique web project that inspires you and you customers.</p>
          </div>
          <div className="myskils_cards">
          <div className="mys_card" data-aos="fade-left">
              <div className="mys_inner">
                <img src="/img/js.svg" alt="" />
                <h3>99%</h3>
              </div>
              <p className="text-center">JavaScript</p>
            </div>
            <div className="mys_card" data-aos="fade-right">
              <div className="mys_inner">
                <img src="/img/python.svg" alt="" />
                <h3>92%</h3>
              </div>
              <p className="text-center">Python</p>
            </div>
            <div className="mys_card" data-aos="fade-right">
              <div className="mys_inner">
                <img src="/img/firebase.svg" alt="" />
                <h3>80%</h3>
              </div>
              <p className="text-center">Firebase</p>
            </div>
            <div className="mys_card" data-aos="fade-right">
              <div className="mys_inner">
                <img src="/img/mongodb.svg" alt="" />
                <h3>98%</h3>
              </div>
              <p className="text-center">MongoDB</p>
            </div>
            <div className="mys_card" data-aos="fade-left">
              <div className="mys_inner">
                <img src="/img/redux.svg" alt="" />
                <h3>85%</h3>
              </div>
              <p className="text-center">Redux</p>
            </div>
            <div className="mys_card" data-aos="fade-left">
              <div className="mys_inner">
                <img src="/img/react.svg" alt="" />
                <h3>99%</h3>
              </div>
              <p className="text-center">React</p>
            </div>
            
          </div>
        </div>
      </section>

      {/* Recent Blogs */}
      <section className="recentblogs">
        <div className="container">
          <div className="myskills_title">
            <h2 data-aos="fade-up">Recent Blogs</h2>
            <p data-aos="fade-up">We put your ideas and thus your wishes in the form of a unique web project that inspires you and you customers.</p>
          </div>
          <div className="recent_blogs">
            {allwork.slice(0, 3).map((blog) => {
              return <Link href={`/blogs/${blog.slug}`} key={blog._id} className="re_blog" data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000">
                <div className="re_blogimg">
                  <img src={blog.images[0] || '/img/noimage.png'} alt={blog.title} />
                  <span>{blog.blogcategory[0]}</span>
                </div>
                <div className="re_bloginfo">
                  <div className="re_topdate flex gap-1">
                    <div className="res_date">
                      <FaCalendarDays /> <span>{formatDate(new Date(blog.createdAt))}</span>
                    </div>
                  </div>
                  <h2>{blog.title}</h2>
                </div>
              </Link>
            })}
          </div>
        </div>
      </section>

    </>
  );
}
