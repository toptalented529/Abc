export const saveUser = (req,res) =>{
    req.checkBody('name').notEmpty().withMessage('الاسم مطلوب')
    req.checkBody('email').notEmpty().withMessage('البريد الالكتروني مطلوب')
    req.checkBody('email').isEmail().withMessage('شبكة البريد الامكتروني غير صحيحة')
    req.checkBody('password').notEmpty().withMessage('كلمة السر مطلوبة')
    req.checkBody('userType').notEmpty().withMessage('نوع المستخدم مطلوب')

}