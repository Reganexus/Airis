"use client";

import Link from "next/link";
import React, { FC } from "react";
import Image from "next/image";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carousel.css";

interface TeamMember {
  pic: string;
  name: string;
  title: string;
  description: string;
}
const team: TeamMember[] = [
  {
    pic: "/img/team_1.png",
    name: "Fernando Alonso",
    title: "Chief Executive Officer",
    description:
      "Fernando leads with vision and passion for technology, driving innovation and ensuring client satisfaction.",
  },
  {
    pic: "/img/team_2.png",
    name: "Maria Johnson",
    title: "Chief Operating Officer",
    description:
      "Maria ensures smooth operations with a focus on efficiency and detail, keeping us on track with our goals.",
  },
  {
    pic: "/img/team_3.png",
    name: "Charles Leclerc",
    title: "Chief Technology Officer",
    description:
      "Charles leads tech development with expertise and innovation, helping us stay competitive in the market.",
  },
  {
    pic: "/img/team_4.png",
    name: "Linda Davis",
    title: "Chief Marketing Officer",
    description:
      "Linda crafts strategies that boost our brand and engage customers, thanks to her understanding of market trends.",
  },
  {
    pic: "/img/team_5.png",
    name: "Robert Brown",
    title: "Chief Financial Officer",
    description:
      "Robert oversees our finances with strategic planning, ensuring growth and stability.",
  },
  {
    pic: "/img/team_6.png",
    name: "Emily Wilson",
    title: "Chief Human Resources Officer",
    description:
      "Emily fosters a positive work environment and focuses on employee development to attract and retain talent.",
  },
];

const Team: FC = () => {
  return (
    <section className="bg-plus bg-cover min-h-[50rem] flex flex-col items-center pb-28">
      <div className="bg-white w-full text-center py-16 shadow-lg">
        <h2 className="text-4xl font-bold mb-8 text-slate-800">
          Meet the Team
        </h2>
        <p className="text-xl max-w-[1000px] m-auto text-slate-600">
          At Airis, we believe that our people are our greatest asset. Our
          diverse and dynamic team is dedicated to driving innovation and
          delivering exceptional results. Get to know the faces behind our
          success:
        </p>
      </div>
      <Carousel />
      <CTA />
    </section>
  );
};

const Carousel: FC = () => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  return (
    <div className="slider-container w-full max-w-7xl my-16 p-8">
      <Slider {...settings}>
        {team.map((member: any) => (
          <div className="slide-wrapper" key={member.name}>
            <TeamCard
              key={member.name}
              pic={member.pic}
              name={member.name}
              title={member.title}
              description={member.description}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

interface TeamCardProps {
  pic: string;
  name: string;
  title: string;
  description: string;
}

const TeamCard: FC<TeamCardProps> = ({ pic, name, title, description }) => {
  return (
    <div className="team-card bg-white rounded-lg border border-slate-400 shadow-md p-4 h-[28rem] m-2 flex flex-col">
      {/* Picture */}
      <div className="relative w-full basis-1/2">
        <Image
          src={pic}
          alt={`picture of ${name}`}
          layout="fill"
          objectFit="cover"
          objectPosition="30% 20%"
          className="rounded-lg"
        />
      </div>

      {/* Text */}
      <div className="basis-1/2">
        <h3 className="text-2xl text-primary font-semibold pt-4">{name}</h3>
        <h6 className="font-medium text-slate-700 mb-3">{title}</h6>
        <p className="text-slate-600">{description}</p>
      </div>
    </div>
  );
};

const CTA: FC = () => {
  return (
    <div className="bg-white rounded-lg border border-slate-500 shadow-lg max-w-[1000px] m-auto px-4 py-8">
      <h2 className="text-4xl text-center text-slate-800 font-bold mb-4 mt-4">
        Elevate your Business with Airis!
      </h2>

      <p className="text-xl text-center text-slate-600 px-8">
        Unlock the full potential of your business with our state-of-the-art AI
        chatbot. Imagine a world where customer queries are handled instantly,
        leads are generated effortlessly, and your team is free to focus on what
        they do best.
      </p>

      <p className="text-xl text-center text-slate-600 mt-4 px-8">
        Join the revolution and watch your business thrive!
      </p>

      <div className="flex justify-center mt-8 mb-4">
        <Link
          href="#"
          className="text-xl bg-primary hover:bg-sky-700 text-white px-8 py-2 rounded-lg"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Team;
