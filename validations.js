import { body } from "express-validator";

export const loginValidation = [
  body("email", "Неверный форма почты").isEmail(),
  body("password", "Пароль минимум 5 символов").isLength({ min: 5 }),
];

export const registerValidation = [
  body("email", "Неверный форма почты").isEmail(),
  body("password", "Пароль минимум 5 символов").isLength({ min: 5 }),
  body("fullName", "Укажите имя").isLength({ min: 3 }),
  body("avatarUrl", "Неверная ссылка на изображение").optional().isURL(),
];

export const postCreateValidation = [
  body("title", "Введите заголовок статьи").isString(),
  body("text", "Введите текст статьи").isString({ min: 3 }),
  body("tags", "Неверный формат тегов ").optional().isString(),
  body("imageUrl", "Неверная ссылка на изображение").optional().isString(),
];
