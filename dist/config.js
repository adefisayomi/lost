"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMessage = exports.DATABASE_URI = exports.__dev__ = exports.BASE_URL = exports.PORT = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
// 
exports.PORT = process.env.PORT || 5000;
exports.BASE_URL = '/api/v1';
exports.__dev__ = process.env.NODE_ENV !== 'production';
exports.DATABASE_URI = process.env.DATABASE_URI;
// 
const errorMessage = (message) => {
    const payload = {
        success: false,
        data: null,
        message
    };
    if (exports.__dev__) {
        console.log(payload);
    }
    return payload;
};
exports.errorMessage = errorMessage;
