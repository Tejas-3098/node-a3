import { Request, Response } from "express";

export default interface MessageControllerI {
    userMessagesAnotherUser (req: Request, res: Response): void;
    findAllMessagesSentByUser (req: Request, res: Response): void;
    findAllMessagesSentToUser (req: Request, res: Response): void;
    deleteMessage (req: Request, res: Response): void;
}