"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by michael.zhang on 1/1/17.
 */
const typed_json_1 = require("typedjson-npm/js/typed-json");
let Configuration = class Configuration {
};
__decorate([
    typed_json_1.JsonMember({ type: String }),
    __metadata("design:type", String)
], Configuration.prototype, "project_name", void 0);
__decorate([
    typed_json_1.JsonMember({ type: String }),
    __metadata("design:type", String)
], Configuration.prototype, "deploy_mode", void 0);
__decorate([
    typed_json_1.JsonMember({ type: String }),
    __metadata("design:type", String)
], Configuration.prototype, "remote_ip", void 0);
__decorate([
    typed_json_1.JsonMember({ type: String }),
    __metadata("design:type", String)
], Configuration.prototype, "remote_username", void 0);
__decorate([
    typed_json_1.JsonMember({ type: String }),
    __metadata("design:type", String)
], Configuration.prototype, "deploy_tag", void 0);
__decorate([
    typed_json_1.JsonMember({ type: String }),
    __metadata("design:type", String)
], Configuration.prototype, "svn_rooturl", void 0);
__decorate([
    typed_json_1.JsonMember({ type: String }),
    __metadata("design:type", String)
], Configuration.prototype, "remote_path", void 0);
__decorate([
    typed_json_1.JsonMember({ type: String }),
    __metadata("design:type", String)
], Configuration.prototype, "theme_name", void 0);
Configuration = __decorate([
    typed_json_1.JsonObject,
    __metadata("design:paramtypes", [])
], Configuration);
exports.Configuration = Configuration;
