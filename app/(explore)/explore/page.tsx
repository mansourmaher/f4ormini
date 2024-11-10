import CourseListSection from "./_explorecomponents/courseListSection";
import HeroSection from "./_explorecomponents/HeroSection";
import ExploreSection from "./_explorecomponents/exploresection";
import { Search } from "lucide-react";
import { Input } from "@headlessui/react";
import { Card, CardContent } from "@/components/ui/card";
import HeroSectionPromo from "./_explorecomponents/HeroSectionPromo";
import WhyChooseUs from "./_explorecomponents/whychooseus";

const courses = [
  {
    id: "1",
    title: "React for Beginners",
    description:
      "Learn React from scratch with this course for beginners and start your career as a React developer.",
    category: "Web Development",
    price: 100,
    chapterLenght: 10,
    imageUrl:
      "https://utfs.io/f/38d1df14-a9d0-418c-9e04-7009a65aecbc-pfwv33.jpg",
    avg: 4.5,
    totalReviews: 120,
    existingpurchase: true,
  },
  {
    id: "2",
    title: "Advanced JavaScript",
    description:
      "Master advanced JavaScript concepts to build complex web applications with ease.",
    category: "Web Development",
    price: 120,
    chapterLenght: 15,
    imageUrl:
      "https://utfs.io/f/38d1df14-a9d0-418c-9e04-7009a65aecbc-pfwv33.jpg",

    avg: 4.7,
    totalReviews: 95,
    existingpurchase: false,
  },
  {
    id: "3",
    title: "Full-Stack Web Development",
    description:
      "Become a full-stack developer by learning both front-end and back-end technologies.",
    category: "Web Development",
    price: 150,
    chapterLenght: 20,
    imageUrl:
      "https://utfs.io/f/38d1df14-a9d0-418c-9e04-7009a65aecbc-pfwv33.jpg",

    avg: 4.8,
    totalReviews: 200,
    existingpurchase: true,
  },
  {
    id: "4",
    title: "Mobile App Development with Flutter",
    description:
      "Build cross-platform mobile applications using Flutter and Dart.",
    category: "Mobile Development",
    price: 130,
    chapterLenght: 12,
    imageUrl:
      "https://utfs.io/f/38d1df14-a9d0-418c-9e04-7009a65aecbc-pfwv33.jpg",

    avg: 4.6,
    totalReviews: 85,
    existingpurchase: false,
  },
  {
    id: "5",
    title: "Data Science for Beginners",
    description:
      "Learn the fundamentals of data science, including Python, machine learning, and data visualization.",
    category: "Data Science",
    price: 140,
    chapterLenght: 18,
    imageUrl:
      "https://utfs.io/f/38d1df14-a9d0-418c-9e04-7009a65aecbc-pfwv33.jpg",

    avg: 4.9,
    totalReviews: 150,
    existingpurchase: true,
  },
  {
    id: "6",
    title: "UI/UX Design Principles",
    description:
      "Understand the core principles of user interface and user experience design.",
    category: "Design",
    price: 110,
    chapterLenght: 8,
    imageUrl:
      "https://utfs.io/f/38d1df14-a9d0-418c-9e04-7009a65aecbc-pfwv33.jpg",

    avg: 4.4,
    totalReviews: 60,
    existingpurchase: false,
  },
  {
    id: "7",
    title: "DevOps Essentials",
    description:
      "Learn the essentials of DevOps and how to implement CI/CD pipelines.",
    category: "DevOps",
    price: 160,
    chapterLenght: 14,
    imageUrl:
      "https://utfs.io/f/38d1df14-a9d0-418c-9e04-7009a65aecbc-pfwv33.jpg",

    avg: 4.7,
    totalReviews: 100,
    existingpurchase: true,
  },
  {
    id: "8",
    title: "Python for Data Analysis",
    description:
      "Analyze and visualize data using Python libraries like Pandas, NumPy, and Matplotlib.",
    category:
      "Data Science Data ScienceData ScienceData ScienceData ScienceData Science",
    price: 135,
    chapterLenght: 12,
    imageUrl:
      "https://utfs.io/f/38d1df14-a9d0-418c-9e04-7009a65aecbc-pfwv33.jpg",

    avg: 4.8,
    totalReviews: 90,
    existingpurchase: true,
  },
  {
    id: "9",
    title: "Machine Learning with TensorFlow",
    description: "Learn machine learning and neural networks using TensorFlow.",
    category: "AI & Machine Learning",
    price: 170,
    chapterLenght: 20,
    imageUrl:
      "https://utfs.io/f/38d1df14-a9d0-418c-9e04-7009a65aecbc-pfwv33.jpg",

    avg: 4.9,
    totalReviews: 140,
    existingpurchase: false,
  },
  {
    id: "10",
    title: "Cloud Computing with AWS",
    description:
      "Understand the fundamentals of cloud computing and AWS services.",
    category: "Cloud Computing",
    price: 155,
    chapterLenght: 16,
    imageUrl:
      "https://utfs.io/f/38d1df14-a9d0-418c-9e04-7009a65aecbc-pfwv33.jpg",

    avg: 4.7,
    totalReviews: 110,
    existingpurchase: true,
  },
  {
    id: "11",
    title: "Cybersecurity Basics",
    description:
      "Learn the basics of cybersecurity, including network security, cryptography, and ethical hacking.",
    category: "Cybersecurity",
    price: 125,
    chapterLenght: 9,
    imageUrl:
      "https://utfs.io/f/38d1df14-a9d0-418c-9e04-7009a65aecbc-pfwv33.jpg",

    avg: 4.6,
    totalReviews: 75,
    existingpurchase: false,
  },
  {
    id: "12",
    title: "Blockchain Development",
    description:
      "Dive into blockchain development and smart contracts using Solidity and Ethereum.",
    category: "Blockchain",
    price: 180,
    chapterLenght: 22,
    imageUrl:
      "https://utfs.io/f/38d1df14-a9d0-418c-9e04-7009a65aecbc-pfwv33.jpg",

    avg: 4.8,
    totalReviews: 160,
    existingpurchase: true,
  },
];
const categories = [
  { name: "Web Development", icon: "🌐" },
  { name: "Data Science", icon: "📊" },
  { name: "Design", icon: "🎨" },
  { name: "Business", icon: "💼" },
  { name: "Marketing", icon: "📣" },
  { name: "Mobile Development", icon: "📱" },
  { name: "AI & Machine Learning", icon: "🤖" },
  { name: "Cloud Computing", icon: "☁️" },
  { name: "DevOps", icon: "⚙️" },
  { name: "Cybersecurity", icon: "🔒" },
  { name: "Blockchain", icon: "🔗" },
  { name: "Product Management", icon: "📦" },
];
function ExplorePage() {
  return (
    <div className="mt-14">
      <HeroSectionPromo />

      <section className="container mx-auto py-8 px-2">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Explore Top Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 bg-gary-100 border rounded-lg p-4">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6">
                <div className="text-4xl mb-2">{category.icon}</div>
                <h3 className="font-semibold">{category.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <CourseListSection
        section_id="Most popular"
        courses={courses}
        titleofbanner="Based on your preferences, we recommend tailored courses just for you."
        descriptionofbanner=" Our personalized recommendations are carefully selected to help you grow
        in your areas of interest. We analyze your learning patterns and
        preferences to curate a unique selection of courses that align with your
        goals. Whether you re a beginner looking to explore new topics or an
        experienced learner advancing your expertise, our system ensures you get
        the most relevant and impactful content."
      />
      {/* this section contain top rated course */}
      <CourseListSection
        section_id="Top rated"
        courses={courses}
        titleofbanner="
        Top-rated courses from our expert instructors."
        descriptionofbanner="Our top-rated courses are designed and delivered by industry experts who"
      />
      {/* this section contain newest course */}
      <CourseListSection
        section_id="Newest"
        courses={courses}
        titleofbanner="Explore our newest courses and stay ahead of the curve."
        descriptionofbanner="Stay up-to-date with the latest trends and technologies by enrolling in our
        newest courses. Our expert instructors are constantly updating their
        content to provide you with the most relevant and cutting-edge
        information. Whether you re looking to expand your knowledge or learn
        something new, our newest courses are the perfect place to start."
      />
      <WhyChooseUs />
    </div>
  );
}

export default ExplorePage;
