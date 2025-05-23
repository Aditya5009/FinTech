import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// export const authenticate = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'Unauthorized' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!);
//     (req as any).user = decoded;
//     next();
//   } catch {
//     res.status(403).json({ message: 'Invalid token' });
//   }
// };


export async function authenticate(req: Request, res: Response, next: NextFunction): Promise<any> {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = decoded;
    next();
  } catch {
    res.status(403).json({ message: 'Invalid token' });
  }
};
