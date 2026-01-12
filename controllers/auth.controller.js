export const getRegisterPage = (req, res) => {
   return res.render("../views/auth/register");//although there was no need of writing views;.render means we have already reached views folder
};
export const getLoginPage = (req, res) => {
return res.render("../views/auth/login");
};
