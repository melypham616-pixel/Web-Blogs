// Bản dịch tiếng Anh của toàn bộ bài viết, gộp từ các file nhỏ theo từng nhóm bài.
// Khoá là id bài trong data/posts.js; stories khớp theo thứ tự với bài gốc.
import { EN_1 } from "./posts-1.js";
import { EN_2 } from "./posts-2.js";
import { EN_3 } from "./posts-3.js";
import { EN_4 } from "./posts-4.js";
import { EN_5 } from "./posts-5.js";
import { EN_6 } from "./posts-6.js";

export const EN = { ...EN_1, ...EN_2, ...EN_3, ...EN_4, ...EN_5, ...EN_6 };
