import { Op } from "sequelize";
import Reception from "../models/reception.model.js";
import User from "../models/user.model.js";
import OquvMarkaz from "../models/uquvMarkaz.model.js";
import sendSMS from "./sendSms.controller.js";
import { logger } from "../services/logger.js";

import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const addReception = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Avtorizatsiya talab qilinadi" });
    }

    const userId = req.user.id;
    const { oquvmarkazId } = req.body;

    const user = await User.findByPk(userId);
    const oquvMarkaz = await OquvMarkaz.findByPk(oquvmarkazId, {
      include: [{ model: User, as: "creator", attributes: ["id", "name", "phone"] }],
    });

    if (!user || !oquvMarkaz) {
      return res.status(404).json({ message: "Foydalanuvchi yoki O‘quv markazi topilmadi" });
    }

    const newReception = await Reception.create({ userId, oquvmarkazId });

    const pdfFileName = `receipt_${newReception.id}.pdf`;
    const pdfPath = path.join(process.cwd(), "uploads", pdfFileName); // ✅ Rootda joylashgan

    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads", { recursive: true });
    }

    const doc = new PDFDocument();
    const stream = fs.createWriteStream(pdfPath);

    doc.pipe(stream);
    doc.fontSize(18).text('O\'QUV MARKAZI BILAN O\'QUVCHI O\'RTASIDAGI SHARTNOMA', { align: 'center' });
    doc.moveDown();

    doc.fontSize(12).text('1. SHARTNOMA TOMONLARI');
    doc.text(`Mazkur shartnoma (keyingi o‘rinlarda "Shartnoma" deb yuritiladi) quyidagi tomonlar o‘rtasida tuzildi:`);
    doc.text(`1.1. O‘quv markazi: ${oquvMarkaz.name}, telefon:  ${oquvMarkaz.creator.phone}`);
    doc.text(`1.2. O‘quvchi: ${user.name}, telefon: ${user.phone}`);
    doc.moveDown();

    doc.text('2. SHARTNOMA MAVZUSI');
    doc.text(`2.1. Ushbu shartnomaga asosan, Markaz O‘quvchiga  kursini o‘qitishni majburiyatiga oladi, O‘quvchi esa belgilangan tartibda o‘quv to‘lovini amalga oshiradi.`);
    doc.text('2.2. Kurs muddati: 1 yil.');
    doc.text('2.3. Dars jadvali: Haftasiga 5 kun, har bir dars davomiyligi 5 soat.');
    doc.moveDown();


    doc.text('3. TOMONLARNING HUQUQ VA MAJBURIYATLARI');
    doc.text('3.1. Markazning majburiyatlari:');
    doc.text('  - O‘quvchini belgilangan dastur bo‘yicha o‘qitish;');
    doc.text('  - Malakali o‘qituvchilar tomonidan ta’lim berilishini ta’minlash;');
    doc.text('  - O‘quvchiga zarur o‘quv materiallarini taqdim etish;');
    doc.text('  - Kursni muvaffaqiyatli tugatgan O‘quvchiga sertifikat berish.');
    doc.text('3.2. O‘quvchining majburiyatlari:');
    doc.text('  - Darslarga muntazam qatnashish va belgilangan intizom qoidalariga rioya qilish;');
    doc.text('  - O‘quv markazining ichki tartib-qoidalariga amal qilish;');
    doc.text('  - O‘quv kursining to‘lovini o‘z vaqtida amalga oshirish;');
    doc.text('  - O‘quv markazi mulkiga ehtiyotkorlik bilan munosabatda bo‘lish.');
    doc.moveDown();

    doc.text('4. TO‘LOV SHARTLARI');
    doc.text(`4.1. Kurs narxi: 2.200.000 so‘m.`);
    doc.text('4.2. To‘lov quyidagi shakllardan biri orqali amalga oshiriladi:');
    doc.text('  - Naqd pul');
    doc.text('  - Bank o‘tkazmasi');
    doc.text('  - Elektron to‘lov tizimlari orqali');
    doc.text('4.3. To‘lov tartibi:');
    doc.text('  - To‘lov to‘liq yoki bosqichma-bosqich amalga oshirilishi mumkin.');
    doc.text('  - Bosqichma-bosqich to‘lov holatida har oyning 1-sanasida kamida 2.200.000 so‘m to‘lanishi shart.');
    doc.text('  - To‘lov kechiktirilgan taqdirda 5 kunga qadar jarima qo‘llanilmaydi, 5 kundan ortsa 100.000 miqdorda jarima belgilanadi.');
    doc.moveDown();


    doc.text('5. SHARTNOMANI BEKOR QILISH SHARTLARI');
    doc.text('5.1. Tomonlarning kelishuviga binoan shartnoma bekor qilinishi mumkin.');
    doc.text('5.2. To‘lov qaytarilishi shartlari:');
    doc.text('  - Agar kurs boshlanmagan bo‘lsa – to‘lov to‘liq qaytariladi.');
    doc.text('  - Kurs boshlangan bo‘lsa, to‘lov qaytarilmaydi, faqat boshqa kursga o‘tkazish imkoniyati mavjud.');
    doc.moveDown();

    doc.text('6. NIZOLARNI HAL QILISH');
    doc.text('6.1. Ushbu shartnoma bo‘yicha kelib chiqadigan nizolar tomonlarning o‘zaro kelishuvi orqali hal qilinadi. Kelishuvga erishilmagan taqdirda, nizolar amaldagi qonunchilikka muvofiq sud orqali hal qilinadi.');
    doc.moveDown();

    doc.text('7. SHARTNOMANING AMAL QILISH MUDDATI');
    doc.text('7.1. Shartnoma imzolangan kundan boshlab kuchga kiradi va kurs muddati tugaguniga qadar amal qiladi.');
    doc.moveDown();

    doc.text('8. QO‘SHIMCHA SHARTLAR');
    doc.text('8.1. Kursni muvaffaqiyatli tamomlagan O‘quvchi maxsus sertifikat yoki diplom bilan taqdirlanadi.');
    doc.text('8.2. O‘quvchi darslarni 20% dan ortiq qoldirsa, yakuniy sertifikat berilmasligi mumkin.');
    doc.text('8.3. O‘quvchi va Markaz o‘rtasida yuzaga kelishi mumkin bo‘lgan boshqa kelishmovchiliklar ushbu shartnoma asosida hal etiladi.');
    doc.moveDown();

    doc.text('TOMONLARNING IMZOLARI');
    doc.text(`O‘quv markazi nomidan: F.I.Sh: ____  Sana: ${new Date().toLocaleDateString()}`);
    doc.text(`O‘quvchi: ${user.name}, telefon: ${user.phone} Sana: ${new Date().toLocaleDateString()}`);
    doc.end();

    stream.on("finish", () => {
      if (!fs.existsSync(pdfPath)) {
        console.error("❌ PDF yaratilmadi:", pdfPath);
        return res.status(500).json({ message: "PDF yaratishda xatolik!" });
      }

      res.download(pdfPath, pdfFileName, (err) => {
        if (err) {
          console.error("❌ PDF yuklashda xatolik:", err);
          return res.status(500).json({ message: "PDF yuklab olishda xatolik!" });
        }

        fs.unlinkSync(pdfPath);
      });
    });

  } catch (error) {
    console.error("❌ Xatolik:", error);
    res.status(500).json({ message: error.message });
  }
};



export const getAllReceptions = async (req, res) => {
  try {
    const { page = 1, size = 10, sortBy, filter } = req.query;
    const limit = parseInt(size);
    const offset = (parseInt(page) - 1) * limit;
// sendSMS(clientNum)
    const queryOptions = {
      include: [
        { model: User, attributes: ["id", "name", "email"] },
        { model: OquvMarkaz, attributes: ["id", "name"] },
      ],
      limit,
      offset,
    };

    if (filter&&sortBy == "oquvmarkazId") {
      queryOptions.where = {
          [Op.and]: [
              { oquvmarkazId: { [Op.like]: `%${filter}%` } },
          ],
      };
  
  }
  if (filter&&sortBy == "userId") {
      queryOptions.where = {
          [Op.and]: [
              { userId: { [Op.like]: `%${filter}%` } },
          ],
      };
      
  }

    if (sortBy) {
      queryOptions.order = [[sortBy, 'ASC']];
    }

    const { rows, count } = await Reception.findAndCountAll(queryOptions);

    const totalItems = count;
    const totalPages = Math.ceil(totalItems / limit);
    logger.info(`Barcha receptionlarni olish sorovi: page=${page}, size=${size}, sortBy=${sortBy}, filter=${filter}`);

    return res.status(200).json({
      message: "Success",
      data: rows,
      pagination: {
        totalItems,
        totalPages,
        currentPage: parseInt(page),
        pageSize: limit,
      },
    });
  } catch (error) {
    logger.error(`Receptionlarni olishda xatolik: ${error.message}`);
    console.error(error);
    return res.status(500).json({ message: "Serverda xatolik yuz berdi." });
  }
};


export const getReceptionById = async (req, res) => {
  try {
    const reception = await Reception.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["id", "name", "email"] },
        { model: OquvMarkaz, attributes: ["id", "name"] }
      ]
    });

    if (!reception) {
      logger.warn(`Reception topilmadi: id=${req.params.id}`);
      return res.status(404).json({ message: "Foydalanuvchi kursga yozilmagan" });
    }
    logger.info(`Reception topildi: id=${req.params.id}`);
    res.json(reception);
  } catch (error) {
    logger.error(`Receptionni olishda xatolik: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

export const updateReception = async (req, res) => {
  try {
    const reception = await Reception.findByPk(req.params.id);

    if (!reception) {
      logger.warn(`Yangilashda reception topilmadi: id=${req.params.id}`);
      return res.status(404).json({ message: "Reception topilmadi" });
    }

    const { userId, oquvmarkazId } = req.body;

    if (userId !== undefined) {
      reception.userId = userId;
    }
    if (oquvmarkazId !== undefined) {
      reception.oquvmarkazId = oquvmarkazId;
    }

    await reception.save();
    logger.info(`Reception yangilandi: id=${req.params.id}, yangi userId=${userId}, yangi oquvmarkazId=${oquvmarkazId}`);


    res.json(reception);
  } catch (error) {
    logger.error(`Receptionni yangilashda xatolik: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};


export const deleteReception = async (req, res) => {
  try {
    const reception = await Reception.findByPk(req.params.id);
    if (!reception) {
      logger.warn(`Ochirishda reception topilmadi: id=${req.params.id}`);
      return res.status(404).json({ message: "Reception topilmadi" });
    }
    await reception.destroy();
    logger.info(`Reception ochirildi: id=${req.params.id}`);
    res.status(200).json({ message: "Reception muvaffaqiyatli ochirildi" });
  } catch (error) {
    logger.error(`Receptionni ochirishda xatolik: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};
