interface Faculty {
  name: string;
  majors: string[];
}

export const faculties: Faculty[] = [
  {
    name: "คณะเกษตร",
    majors: [
      "สาขาการจัดการศัตรูพืชและสัตว์",
      "สาขาเกษตรเขตร้อน",
      "สาขาคหกรรมศาสตร์",
      "สาขาวิทยาศาสตร์เกษตร",
      "สาขาเคมีการเกษตร",
      "สาขาสัตวศาสตร์อุตสาหกรรม",
      "สาขาอาหารโภชนาการและการกำหนดอาหาร",
      "สาขาเทคโนโลยีระบบเกษตร",
    ],
  },
  {
    name: "คณะบริหารธุรกิจ",
    majors: [
      "สาขาการเงิน",
      "สาขาการตลาด",
      "สาขาการจัดการ",
      "สาขาการจัดการการผลิต",
      "สาขาหลักสูตรบัญชีบัณฑิต (หลักสูตรนานาชาติ)",
    ],
  },
  {
    name: "คณะประมง",
    majors: [
      "สาขาการจัดการประมง",
      "สาขาชีววิทยาประมง",
      "สาขาผลิตภัณฑ์ประมง",
      "สาขาเพาะเลี้ยงสัตว์น้ำ",
      "สาขาวิทยาศาสตร์ทางทะเล",
    ],
  },
  {
    name: "คณะมนุษยศาสตร์",
    majors: [
      "สาขาปรัชญาและศาสนา",
      "สาขาภาษาไทย",
      "สาขาภาษาญี่ปุ่น",
      "สาขาภาษาฝรั่งเศส",
      "สาขาภาษาเยอรมัน",
      "สาขาภาษาอังกฤษ",
      "สาขาวรรณคดี",
      "สาขานวัตกรรมการท่องเที่ยว",
      "สาขาการจัดการการท่องเที่ยว",
      "สาขานิเทศศาสตร์",
      "สาขาดนตรีไทย",
      "สาขาดนตรีตะวันตก",
      "สาขาภาษาจีน",
      "สาขาภาษาจีนธุรกิจ",
      "สาขาภาษาไทยเพื่อการสื่อสารสำหรับชาวต่างประเทศ",
    ],
  },
  {
    name: "คณะวนศาสตร์",
    majors: [
      "สาขาวนศาสตร์",
      "สาขาวิทยาศาสตร์ชีวภาพป่าไม้",
      "สาขาเทคโนโลยีเยื่อและกระดาษ",
      "สาขาเทคโนโลยีผลิตภัณฑ์ไม้และกระดาษ",
    ],
  },
  {
    name: "คณะวิทยาศาสตร์",
    majors: [
      "สาขาคณิตศาสตร์",
      "สาขาสถิติ",
      "สาขาวิทยาการคอมพิวเตอร์",
      "สาขาฟิสิกส์",
      "สาขาเคมี",
      "สาขาชีวเคมี",
      "สาขาเคมีอุตสาหกรรม",
      "สาขาชีววิทยา",
      "สาขาจุลชีววิทยา",
      "สาขาวิทยาศาสตร์ชีวภาพรังสี",
      "สาขาวิทยาศาสตร์นิวเคลียร์",
      "พฤกษศาสตร์",
      "สาขาพันธุศาสตร์",
      "สาขาวิทยาศาสตร์พื้นพิภพ",
      "สาขาเคมีบูรณาการ",
      "สาขาวิทยาศาสตร์ชีวภาพและเทคโนโลยี",
      "สาขาหลักสูตรเตรียมแพทย์ศาสตร์ ชั้นปีที่ 1",
    ],
  },
  {
    name: "คณะวิศวกรรมศาสตร์",
    majors: [
      "วิศวกรรมเครื่องกล",
      "สาขาวิศวกรรมไฟฟ้า",
      "สาขาวิศวกรรมไฟฟ้าเครื่องกลการผลิต",
      "สาขาวิศวกรรมโยธา",
      "สาขาวิศวกรรมโยธา-ทรัพยากรน้ำ",
      "สาขาวิศวกรรมอุตสาหการ",
      "สาขาวิศวกรรมเคมี",
      "สาขาวิศวกรรมสิ่งแวดล้อม",
      "สาขาวิศวกรรมคอมพิวเตอร์",
      "สาขาวิศวกรรมซอฟต์แวร์และความรู้",
      "สาขาวิศวกรรมวัสดุ",
      "สาขาวิศวกรรมการบินและอวกาศ",
      "สาขาการจัดการเทคโนโลยีการบิน",
      "สาขาวิศวกรรมสำรวจและสารสนเทศภูมิศาสตร์",
    ],
  },
  {
    name: "คณะศึกษาศาสตร์",
    majors: ["สาขาศึกษาศาสตร์", "สาขาสุขศึกษา", "สาขาพลศึกษา"],
  },
  {
    name: "คณะเศรษฐศาสตร์",
    majors: [
      "สาขาเศรษฐศาสตร์",
      "สาขาเศรษฐศาสตร์การประกอบการ",
      "สาขาเศรษฐศาสตร์เกษตรและทรัพยากร",
      "สาขาเศรษฐศาสตร์สหกรณ์",
      "สาขาธุรกิจการเกษตร",
    ],
  },
  {
    name: "คณะสถาปัตยกรรมศาสตร์",
    majors: [
      "สาขาสถาปัตยกรรมศาสตรบัณฑิต",
      "สาขาภูมิสถาปัตยกรรมศาสตรบัณฑิต",
      "สาขาวิทยาศาสตรบัณฑิต สาขานวัตกรรมการออกแบบผลิตภัณฑ์เชิงบูรณาการ",
    ],
  },
  {
    name: "คณะสังคมศาสตร์",
    majors: [
      "สาขาประวัติศาสตร์",
      "สาขาภูมิศาสตร์",
      "สาขาเอเชียตะวันออกเฉียงใต้ศึกษา",
      "สาขาสังคมวิทยาและมานุษยวิทยา",
      "สาขาจิตวิทยา",
      "สาขานิติศาสตร",
      "สาขารัฐศาสตร์",
      "สาขารัฐประศาสนศาสตร์",
    ],
  },
  {
    name: "คณะสัตวแพทยศาสตร์",
    majors: ["สาขาสัตวแพทยศาสตร"],
  },
  {
    name: "คณะอุตสาหกรรมเกษตร",
    majors: [
      "สาขาเทคโนโลยีชีวภาพ",
      "สาขาวิศวกรรมอาหาร",
      "สาขาพัฒนาผลิตภัณฑ์อุตสาหกรรมเกษตร",
      "สาขาเทคโนโลยีการบรรจุ",
      "สาขาวิทยาศาสตร์และเทคโนโลยีการอาหาร",
      "สาขาวิทยาศาสตร์และเทคโนโลยีสิ่งทอ",
      "สาขานวัตกรรมและเทคโนโลยีอุตสาหกรรมเกษตร",
    ],
  },
  {
    name: "คณะเทคนิคการสัตวแพทย์",
    majors: ["สาขาการพยาบาลสัตว์", "สาขาเทคนิคการสัตวแพทย์"],
  },
  {
    name: "คณะสิ่งแวดล้อม",
    majors: ["สาขาวิทยาศาสตร์และเทคโนโลยีสิ่งแวดล้อม"],
  },
  {
    name: "คณะวิทยาลัยพยาบาลบรมราชชนนี นพรัตน์วชิระ",
    majors: ["สาขาพยาบาลศาสตรบัณฑิต", "สาขาพยาบาลวิทยาศาสตรบัณฑิต"],
  },
];
