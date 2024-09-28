import { ChevronsDown } from "lucide-react";
import Image from "next/image";
import { Button } from "~/components/ui/button";

function CandidateCard() {
  return (
    <div className="rounded-lg p-2 border-2 border-primary">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/b/b7/X_logo.jpg"
            alt="test"
            width={64}
            height={64}
          />
          <div className="">
            <h5>นางสาววิมุดากร กิจเตชะพานิช</h5>
            <h6 className="text-sm">
              คณะ วิทยาศาสตร์ สาขา วิทยาการคอมพิวเตอร์
            </h6>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="px-8 py-1 bg-primary rounded-md text-white">
            <h5>GPA</h5>
            <h6>x.xx</h6>
          </div>
          <div className="px-8 py-1 bg-primary rounded-md text-white">
            <h5>Work Experience</h5>
            <h6>x.xx</h6>
          </div>
          <div className="px-8 py-1 bg-primary rounded-md text-white">
            <h5>Work Duration</h5>
            <h6>x.xx</h6>
          </div>
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <ChevronsDown size="1rem" />
          </Button>
        </div>
      </div>
      <div className="mt-2">
        <div className="flex gap-4">
          <div>
            <h6 className="text-sm font-medium">
              Honours, Awards, Achievements
            </h6>
            <ul className="list-inside list-disc pl-2 text-sm">
              <li>ได้รับรางวัลชนะเลิศอันดับโหล่ รายการ XXX ปี yyyy</li>
              <li>ได้รับรางวัลชนะเลิศอันดับโหล่ รายการ XXX ปี yyyy</li>
            </ul>
            <h6>Attitude</h6>
            <ul className="list-inside list-disc pl-2 text-sm">
              <li>Day one or one day</li>
            </ul>
          </div>
          <div>
            <h6 className="text-sm font-medium">Experiences</h6>
            <ul className="list-inside list-disc pl-2 text-sm">
              <li>
                Software Developer (Internship) at INOX company for 6 months
              </li>
              <li>
                UX/UI designer (Part time) at Kasetsart University for 2 months
              </li>
            </ul>
          </div>
          <div>
            <h6 className="text-sm font-medium">Strength</h6>
            <ul className="list-inside list-disc pl-2 text-sm">
              <li>ความคิดสร้างสรรค์</li>
              <li>การจัดสรรเวลาที่ดี</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center gap-3">
        <Button variant="outline" size="sm" className="w-24">
          ลบ
        </Button>
        <Button className="w-24" size="sm">
          รับสมัคร
        </Button>
      </div>
    </div>
  );
}

export default CandidateCard;
