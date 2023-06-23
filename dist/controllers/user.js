"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.deleteUser = exports.getUser = void 0;
const config_1 = require("../config");
const User_1 = __importDefault(require("../schemas/User"));
const getUser = (param) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ $or: [{ _id: param }, { email: param }] }).select('-password');
        if (!user)
            throw new Error('user not found!');
        return ({
            success: true,
            message: 'user found',
            data: user
        });
    }
    catch (err) {
        return (0, config_1.errorMessage)(err.message);
    }
});
exports.getUser = getUser;
const deleteUser = (param) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User_1.default.findOneAndDelete({ $or: [{ _id: param }, { email: param }] });
        return ({
            success: true,
            message: 'user successfuly deleted',
            data: null
        });
    }
    catch (err) {
        return (0, config_1.errorMessage)(err.message);
    }
});
exports.deleteUser = deleteUser;
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = payload;
        const userExist = yield User_1.default.exists({ email });
        if (userExist)
            throw new Error('user already exist!');
        // 
        const newUser = new User_1.default(Object.assign({}, payload));
        yield newUser.save();
        return ({
            success: true,
            message: 'user successfuly deleted',
            data: null
        });
    }
    catch (err) {
        return (0, config_1.errorMessage)(err.message);
    }
});
exports.createUser = createUser;
