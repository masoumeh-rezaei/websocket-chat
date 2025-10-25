import { z } from "zod";

// تابع کمکی اعتبارسنجی ایمیل
const emailValidation = (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

/** Login form schema */
export const loginSchema = z.object({
    email: z.string()
        .min(1, { message: "ایمیل الزامی است" })
        .refine(emailValidation, { message: "فرمت ایمیل معتبر نیست" }),
    password: z.string()
        .min(1, { message: "رمز عبور الزامی است" })
        .min(6, { message: "رمز عبور باید حداقل ۶ کاراکتر باشد" }),
});

export type LoginFormInput = z.input<typeof loginSchema>;
export type LoginFormOutput = z.output<typeof loginSchema>;

/** Register form schema */
export const registerSchema = z.object({
    name: z.string()
        .min(1, { message: "نام الزامی است" })
        .min(2, { message: "نام باید حداقل ۲ کاراکتر باشد" }),
    email: z.string()
        .min(1, { message: "ایمیل الزامی است" })
        .refine(emailValidation, { message: "فرمت ایمیل معتبر نیست" }),
    password: z.string()
        .min(1, { message: "رمز عبور الزامی است" })
        .min(6, { message: "رمز عبور باید حداقل ۶ کاراکتر باشد" }),
    confirmPassword: z.string()
        .min(1, { message: "تکرار رمز عبور الزامی است" })
        .min(6, { message: "تکرار رمز عبور باید حداقل ۶ کاراکتر باشد" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تکرار آن یکسان نیستند",
    path: ["confirmPassword"],
});

export type RegisterFormInput = z.input<typeof registerSchema>;
export type RegisterFormOutput = z.output<typeof registerSchema>;
