import { JobLogo } from "~/configs/assets";
import { JobAnnouncement } from "~/types/DTO/jobAnnouncement";

export const jobAnnouncements: JobAnnouncement[] = [
  {
    id: "1",
    companyName: "Google",
    companyImage: JobLogo,
    companyAddress: {
      place: "",
      province: "",
      amphur: "",
      tambon: ""
    },
    title: "Software Engineer",
    positions: [
      {
        id: "1",
        announceId: "1",
        jobMode: 0,
        name: "Test",
        amount: 1,
        detail: "This is a test detail.",
        qualificationDetail: "This is a test qualification detail.",
        welfare: "This is a test welfare.",
        studentUsername: "TestStudent",
      },
    ],
    description: "Google is hiring software engineers.",
    createdAt: "2024-09-23",
  },
];
