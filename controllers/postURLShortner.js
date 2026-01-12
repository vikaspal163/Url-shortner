import crypto from "crypto";
import { loadLinks,saveLinks,getLinkByShortCode } from "../models/modelShortner.js";


export const getShortnerPage = async (req, res) => {
  try {
    const links = await loadLinks();

    return res.render("index",{links, host:req.host});
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
}

export const postURLShortner =  async (req, res) => {
  try {
    const { url, shortCode } = req.body;
    const finalShortCode =
      shortCode && shortCode.trim() !== ""
        ? shortCode
        : crypto.randomBytes(4).toString("hex");

    const links = await loadLinks();

    if (links[finalShortCode]) {
      return res
        .status(400)
        .send("Shortcode already exists.Please choose another");
    }

    // links[finalShortCode] = url;
    // await saveLinks(links);

    await saveLinks({url,shortCode});

    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

export const redirectToShortLink = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const link = await getLinkByShortCode(shortCode);
    // const links = await loadLinks();
    if (!link) return res.redirect("/404");
    return res.redirect(link.url);
  } catch (err) {
    console.error(err);
    return res.status(500).send("internal server error");
  }};