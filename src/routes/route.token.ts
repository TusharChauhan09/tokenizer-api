import express from "express";
import { tokens, encode, decode } from "../controllers/controller.token";

const Router = express.Router();

Router.post("/", tokens);

Router.post("/encode", encode);

Router.post("/decode", decode);

export default Router;
