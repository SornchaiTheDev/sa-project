import React from "react";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

function ConfirmJobPage() {
  return (
    <div className="flex justify-center items-center">
      <div className="border-2 border-primary rounded-lg mt-32 p-4 mx-4 w-[500px]">
        <h4 className="text-xl text-center font-medium">ยินดีด้วย</h4>
        <h5 className="text-lg font-medium">
          ยินดีด้วย คุณผ่านเข้าทำงาน ยืนยันสิทธิ์หรือไม่
        </h5>
        <div className="flex gap-2">
          <h6>บริษัท</h6>
          <h5 className="font-medium">เด็กดอกไม้ จำกัด</h5>
        </div>
        <div className="flex gap-2">
          <h6>ตำแหน่ง</h6>
          <h5 className="font-medium">Content Creator</h5>
        </div>
        <div>
          <RadioGroup
            className="flex gap-20 mt-4"
            defaultValue="none"
            // value={selected}
            // onValueChange={(v: Selected) => setSelected(v)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="already-has" id="already-has" />
              <Label htmlFor="already-has">ยอมรับ</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="not-yet" id="not-yet" />
              <Label htmlFor="not-yet">ปฏิเสธ</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="flex justify-end mt-4">
          <Button className="w-28">บันทึก</Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmJobPage;
