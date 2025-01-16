import mongoose from 'mongoose';
import { SKILL_LEVEL } from '../constants/enum.js';

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      enum: SKILL_LEVEL,
      default: SKILL_LEVEL[1],
    },
    description: {
      type: String,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } // Tự động thêm createdAt và updatedAt
);

// Middleware trước khi lưu: Có thể dùng nếu cần xử lý dữ liệu (hiện tại không yêu cầu gì thêm)
skillSchema.pre('save', async function (next) {
  this.updated_at = Date.now();
  next();
});

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;
