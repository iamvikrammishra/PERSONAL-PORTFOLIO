import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";

export default function projects() {

    const { alldata, loading } = useFetchData('/api/projects');

    const publishedData = alldata.filter(ab => ab.status === "publish");

    const [selectedCategory, setSelectedCategory] = useState('All');
    const [filteredProjects, setFilteredProjects] = useState([]);

    useEffect(() => {
        // Filter projects based on selectedCategory
        if (selectedCategory === 'All') {
            setFilteredProjects(alldata.filter(pro => pro.status === 'publish'));
        } else {
            setFilteredProjects(alldata.filter(pro => pro.projectcategory[0] === selectedCategory && pro.status === 'publish'));
        }
    }, [selectedCategory, alldata]);

    return <>
        <Head>
            <title>Project</title>
        </Head>
        <div className="projectpage">
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
                                filteredProjects.slice(0, 20).map((pro) => (
                                    <Link href={`/projects/${pro.slug}`} key={pro._id} className="procard" data-aos="flip-left"
                                        data-aos-easing="ease-out-cubic"
                                        data-aos-duration="2000">
                                        <div className="proimgbox">
                                            <img src={pro.images[0]} alt={pro.title} />
                                        </div>
                                        <div className="procontentbox">
                                            <h2>{pro.title}</h2>
                                            {/* <p>{pro.description}</p> */}
                                            <GoArrowUpRight />
                                        </div>
                                    </Link>
                                ))
                            )
                        )}

                    </div>
                </div>
            </section>
        </div>
    </>
}