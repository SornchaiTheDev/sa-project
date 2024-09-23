import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/th";

dayjs.locale("th");

dayjs.extend(buddhistEra);
dayjs.extend(relativeTime);

export default dayjs;
