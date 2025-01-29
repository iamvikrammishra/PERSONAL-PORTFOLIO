import Link from "next/link";
import { FaFacebookF, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa6";
import { GrLinkedinOption } from "react-icons/gr";
import { LiaBasketballBallSolid } from "react-icons/lia";

export default function Footer() {
    return <>
        <footer className="footer">
            <div className="footersec flex flex-center flex-col gap-2">
                <div className="logo">
                    <img src="/img/logo.png" alt="" />
                </div>
                <ul className="flex gap-2">
                    <li><Link href='/services'>Services</Link></li>
                    <li><Link href='/services'>Works</Link></li>
                    <li><Link href='/services'>Resume</Link></li>
                    <li><Link href='/services'>Skills</Link></li>
                    <li><Link href='/services'>Testimonials</Link></li>
                    <li><Link href='/services'>Contact</Link></li>
                </ul>
                <ul className="hero_social">
                  <li><a target="_blank" href="https://x.com/thevkmcoder"><FaTwitter /></a></li>
                  <li><a target="_blank" href="https://www.instagram.com/thevkmcoder/?next=%2F&hl=en"><FaInstagram /></a></li>
                  <li><a target="_blank" href="https://www.linkedin.com/in/vikram-mishra-8545aa1a4/"><GrLinkedinOption /></a></li>
                  <li><a target="_blank" href="https://github.com/iamvikrammishra/iamvkmishra"><FaGithub /></a></li>
                </ul>
                <div className="copyrights">&copy; 2024 All Rights Reserved By <span>Vikram Kumar Mishra</span></div>
            </div>
        </footer>
    </>
}