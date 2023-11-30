"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../db/index"));
class ProductRepository {
    retrieveAll(searchParams) {
        let query = "SELECT * FROM product";
        let condition = "";
        if (searchParams === null || searchParams === void 0 ? void 0 : searchParams.published)
            condition += "published = TRUE";
        if (searchParams === null || searchParams === void 0 ? void 0 : searchParams.name)
            condition += `LOWER(title) LIKE '%${searchParams.name}%'`;
        if (condition.length)
            query += " WHERE " + condition;
        return new Promise((resolve, reject) => {
            index_1.default.query(query, (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res);
            });
        });
    }
    save(product) {
        return new Promise((resolve, reject) => {
            index_1.default.query("INSERT INTO product (name, description) VALUES(?,?)", [product.name, product.description], (err, res) => {
                if (err)
                    reject(err);
                else
                    this.retrieveById(res.insertId)
                        .then((product) => resolve(product))
                        .catch(reject);
            });
        });
    }
    retrieveById(productId) {
        return new Promise((resolve, reject) => {
            index_1.default.query("SELECT * FROM product WHERE id = ?", [productId], (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res === null || res === void 0 ? void 0 : res[0]);
            });
        });
    }
    update(product) {
        return new Promise((resolve, reject) => {
            index_1.default.query("UPDATE product SET name = ?, description = ?  WHERE id = ?", [product.name, product.description, product.id], (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res.affectedRows);
            });
        });
    }
    delete(productId) {
        return new Promise((resolve, reject) => {
            index_1.default.query("DELETE FROM product WHERE id = ?", [productId], (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res.affectedRows);
            });
        });
    }
}
exports.default = new ProductRepository();
