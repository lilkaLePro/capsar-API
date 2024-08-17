import { Response } from "express"
import { Request } from "express-serve-static-core"

export const mockRequest = {} as Request
export const mockResponse = {
    send: jest.fn(),
} as unknown as Response