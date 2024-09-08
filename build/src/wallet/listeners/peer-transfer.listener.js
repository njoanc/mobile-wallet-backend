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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeerToPeerEventListener = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const mail_service_1 = require("../../mail/mail.service");
let PeerToPeerEventListener = class PeerToPeerEventListener {
    constructor(mailService) {
        this.mailService = mailService;
    }
    async handlePeerToPeerEvent(event) {
        // handle and process "handlePeerToPeerEvent" event
        const emailEvent = await this.mailService.send(event);
        return emailEvent;
    }
};
exports.PeerToPeerEventListener = PeerToPeerEventListener;
__decorate([
    (0, event_emitter_1.OnEvent)('token.*'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PeerToPeerEventListener.prototype, "handlePeerToPeerEvent", null);
exports.PeerToPeerEventListener = PeerToPeerEventListener = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mail_service_1.MailService])
], PeerToPeerEventListener);
//# sourceMappingURL=peer-transfer.listener.js.map