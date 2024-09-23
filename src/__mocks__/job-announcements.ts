import { JobLogo } from "~/configs/assets";
import { JobAnnouncement } from "~/types/jobAnnouncement";

export const jobAnnouncements: JobAnnouncement[] = [
  {
    id: "1",
    companyName: "Google",
    companyImage:
      "https://storage.googleapis.com/gd-prod/images/a910d418-7123-4bc4-aa3b-ef7e25e74ae6.60c498c559810aa0.webp",
    title: "Software Engineer",
    positions: [
      { name: "Frontend", amount: 2 },
      { name: "Backend", amount: 1 },
    ],
    description: "Google is hiring software engineers.",
    createdAt: "2024-09-23",
  },
  {
    id: "2",
    companyName: "Facebook",
    companyImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png",
    title: "Product Manager",
    positions: [{ name: "Product Manager", amount: 1 }],
    description: "Facebook is hiring a product manager.",
    createdAt: "2024-09-23",
  },
  {
    id: "3",
    companyName: "Apple",
    companyImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1200px-Apple_logo_black.svg.png",
    title: "iOS Developer",
    positions: [{ name: "iOS Developer", amount: 1 }],
    description: "Apple is hiring an iOS developer.",
    createdAt: "2024-09-23",
  },
  {
    id: "4",
    companyName: "Microsoft",
    companyImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1024px-Microsoft_logo.svg.png",
    title: "Cloud Engineer",
    positions: [{ name: "Cloud Engineer", amount: 1 }],
    description: "Microsoft is hiring a cloud engineer.",
    createdAt: "2024-09-23",
  },
  {
    id: "5",
    companyName: "Amazon",
    companyImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png",
    title: "Data Scientist",
    positions: [{ name: "Data Scientist", amount: 1 }],
    description: "Amazon is hiring a data scientist.",
    createdAt: "2024-09-23",
  },
  {
    id: "6",
    companyName: "Netflix",
    companyImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png",
    title: "UI/UX Designer",
    positions: [{ name: "UI/UX Designer", amount: 1 }],
    description: "Netflix is hiring a UI/UX designer.",
    createdAt: "2024-09-23",
  },
  {
    id: "7",
    companyName: "Twitter",
    companyImage:
      "https://upload.wikimedia.org/wikipedia/commons/b/b7/X_logo.jpg",
    title: "Social Media Manager",
    positions: [{ name: "Social Media Manager", amount: 1 }],
    description: "Twitter is hiring a social media manager.",
    createdAt: "2024-09-23",
  },
  {
    id: "8",
    companyName: "LinkedIn",
    companyImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/1200px-LinkedIn_logo_initials.png",
    title: "HR Manager",
    positions: [{ name: "HR Manager", amount: 1 }],
    description: "LinkedIn is hiring an HR manager.",
    createdAt: "2024-09-23",
  },
  {
    id: "9",
    companyName: "บริษัท ยิบอินซอยและบริษัทในเครือ/บริษัท ยิบอินซอย จำกัด",
    companyImage: JobLogo,
    title: "Software Developer , Programmer , Backend developer",
    positions: [{ name: "Software Developer", amount: 1 }],
    description:
      "พัฒนา Web Application และ Support การใช้งานตามที่ได้รับมอบหมายพัฒนาระบบออกแบบ CSS หรือ TailwindCSS และ Support การใช้งานของ User ตามที่ได้รับมอบหมายติดต่อประสานงานระหว่าง User และ Programmer ภายในทีม",
    createdAt: "2024-09-23",
  },
];
