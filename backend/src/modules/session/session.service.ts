import { ErrorCode } from "@/common/enums/error-code.enum";
import { BadRequestException } from "@/common/utils/catch-error";
import SessionModel from "@/database/models/session.model";
import UserModel from "@/database/models/user.model";
import { Op } from "sequelize";

export class SessionService {

  async getAllSessions(userId: number, sessionId?: string) {
    const user = await UserModel.findByPk(userId);
    if (!user) {
      throw new BadRequestException("User not found", ErrorCode.USER_NOT_FOUND);
    }
    const sessions = await SessionModel.findAll({
      where: {
        userId,
        revokedAt: { [Op.eq]: null },
      },
      order: [["createdAt", "DESC"]],
    });
    sessions.forEach((session) => {
      session.isCurrent = Number(session.id) === Number(sessionId);
    });
    return {
      sessions,
    };
  }

  async getSessionById(userId: number, sessionId: number) {
    const user = await UserModel.findByPk(userId);
    if (!user) {
      throw new BadRequestException("User not found", ErrorCode.USER_NOT_FOUND);
    }
    const session = await SessionModel.findByPk(sessionId);
    if (!session) {
      throw new BadRequestException("Session not found", ErrorCode.SESSION_NOT_FOUND);
    }
    if (session.userId !== userId) {
      throw new BadRequestException("Session not found", ErrorCode.AUTH_USER_NOT_FOUND);
    }
    session.isCurrent = Number(session.id) === Number(sessionId);
    return session;
  }

  async logoutSession(userId: number, userSessionId: number, sessionId: number) {
    const user = await UserModel.findByPk(userId);
    if (!user) {
      throw new BadRequestException("User not found", ErrorCode.USER_NOT_FOUND);
    }
    if (userSessionId !== sessionId) {
      return await SessionModel.update({ revokedAt: new Date() }, {
        where: {
          userId,
          id: sessionId,
        },
      });
    } else {
      throw new BadRequestException("Cannot logout current session", ErrorCode.INTERNAL_SERVER_ERROR);
    }
  }

  async logoutAllSessions(userId: number, sessionId: number) {
    const user = await UserModel.findByPk(userId);
    if (!user) {
      throw new BadRequestException("User not found", ErrorCode.USER_NOT_FOUND);
    }
    await SessionModel.update({ revokedAt: new Date() }, {
      where: {
        userId,
        id: {
          [Op.not]: sessionId,
        },
        revokedAt: { [Op.eq]: null },
      },
    });
    return;
  }

  async getSessionsHistory(userId: number) {
    const user = await UserModel.findByPk(userId);
    if (!user) {
      throw new BadRequestException("User not found", ErrorCode.USER_NOT_FOUND);
    }
    const sessions = await SessionModel.findAll({
      where: {
        userId: userId,
        revokedAt: { [Op.not]: null },
      },
      order: [["revokedAt", "DESC"]],
    });
    return sessions;
  }

  async deleteSessionHistory(userId: number, sessionId: number) {
    const user = await UserModel.findByPk(userId);
    if (!user) {
      throw new BadRequestException("User not found", ErrorCode.USER_NOT_FOUND);
    }
    await SessionModel.destroy({
      where: {
        userId: userId,
        revokedAt: { [Op.not]: null },
        id: {
          [Op.not]: sessionId,
        },
      },
    });
    return;
  }
}