import { NotFoundException } from "../../common/utils/catch-error";
import SessionModel from "../../database/models/session.model";

export class SessionService {
  /* public async getAllSessions(userId: string) {
    const sessions = await SessionModel.find(
      {
        userId,
        expiredAt: { $gt: new Date() }
      },
      {
        _id: 1,
        userId: 1,
        userAgent: 1,
        expiredAt: 1,
        createdAt: 1,
      },
      {
        sort: { createdAt: -1 },
      }
    );
    return { sessions };
  }

  public async getSessionById(sessionId: string) {
    const session = await SessionModel.findById(sessionId).populate("userId").select("-expiredAt");
    if (!session) {
      throw new NotFoundException("Session not found");
    }
    const { userId: user } = session;
    return { user };
  }

  public async deleteSession(sessionId: string, userId: string) {
    const deletedSession = await SessionModel.findByIdAndDelete({
      _id: sessionId,
      userId,
    });
    if (!deletedSession) {
      throw new NotFoundException("Session not found");
    }
    return;
  } */

  async deleteSession(sessionId: number, userId: number) {
    const deletedSession = await SessionModel.destroy({
      where: {
        id: sessionId,
        userId,
      },
    });
    if (deletedSession === 0) {
      throw new NotFoundException("Session not found");
    }
    return;
  }
}